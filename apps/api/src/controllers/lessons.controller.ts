import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { sendSuccess } from '../utils/response.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';
import type { VideoProgressInput } from '../validators/lesson.validator.js';

export async function getLessonById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const lessonId = req.params.id;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            courseId: true,
            course: {
              select: { id: true, title: true },
            },
            lessons: {
              orderBy: { order: 'asc' },
              select: { id: true, title: true, order: true },
            },
          },
        },
        resources: true,
      },
    });

    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: lesson.module.courseId },
      },
    });

    if (!enrollment) {
      throw new ForbiddenError('Not enrolled in this course');
    }

    // Get lesson progress
    const progress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });

    // Get video progress
    const videoProgress = await prisma.videoProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });

    // Find prev/next lessons
    const moduleLessons = lesson.module.lessons;
    const currentIndex = moduleLessons.findIndex((l) => l.id === lessonId);
    const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
    const nextLesson =
      currentIndex < moduleLessons.length - 1
        ? moduleLessons[currentIndex + 1]
        : null;

    sendSuccess(res, {
      lesson: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        objective: lesson.objective,
        videoUrl: lesson.videoUrl,
        durationMinutes: lesson.durationMinutes,
        order: lesson.order,
        module: {
          id: lesson.module.id,
          title: lesson.module.title,
          courseId: lesson.module.courseId,
          courseTitle: lesson.module.course.title,
        },
        resources: lesson.resources,
        isCompleted: progress?.completed || false,
        videoProgress: videoProgress?.positionSeconds || 0,
        prevLesson: prevLesson
          ? { id: prevLesson.id, title: prevLesson.title, moduleId: lesson.module.id }
          : null,
        nextLesson: nextLesson
          ? { id: nextLesson.id, title: nextLesson.title, moduleId: lesson.module.id }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function completeLesson(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const lessonId = req.params.id;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            lessons: { select: { id: true } },
            course: {
              include: {
                modules: {
                  include: { lessons: { select: { id: true } } },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: lesson.module.courseId },
      },
    });

    if (!enrollment) {
      throw new ForbiddenError('Not enrolled in this course');
    }

    // Mark lesson as complete
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        completed: true,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
    });

    // Calculate updated progress
    const allCourseLessons = lesson.module.course.modules.flatMap(
      (m) => m.lessons
    );
    const completedProgress = await prisma.lessonProgress.findMany({
      where: {
        userId,
        lessonId: { in: allCourseLessons.map((l) => l.id) },
        completed: true,
      },
    });

    const moduleProgress =
      lesson.module.lessons.length > 0
        ? Math.round(
            (completedProgress.filter((p) =>
              lesson.module.lessons.some((l) => l.id === p.lessonId)
            ).length /
              lesson.module.lessons.length) *
              100
          )
        : 0;

    const courseProgress =
      allCourseLessons.length > 0
        ? Math.round((completedProgress.length / allCourseLessons.length) * 100)
        : 0;

    sendSuccess(res, {
      success: true,
      progress: {
        lessonCompleted: true,
        moduleProgress,
        courseProgress,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateVideoProgress(
  req: Request<{ id: string }, unknown, VideoProgressInput>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const lessonId = req.params.id;
    const { positionSeconds } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: { select: { courseId: true } },
      },
    });

    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: lesson.module.courseId },
      },
    });

    if (!enrollment) {
      throw new ForbiddenError('Not enrolled in this course');
    }

    await prisma.videoProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        positionSeconds,
      },
      update: {
        positionSeconds,
      },
    });

    sendSuccess(res, { success: true });
  } catch (error) {
    next(error);
  }
}
