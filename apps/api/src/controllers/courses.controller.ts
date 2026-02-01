import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { sendSuccess } from '../utils/response.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export async function getEnrolledCourses(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: {
                  select: { id: true },
                },
              },
            },
          },
        },
      },
    });

    const lessonProgress = await prisma.lessonProgress.findMany({
      where: { userId },
    });

    const completedLessonIds = new Set(
      lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );

    const courses = enrollments.map((enrollment) => {
      const course = enrollment.course;
      const allLessons = course.modules.flatMap((m) => m.lessons);
      const completedLessons = allLessons.filter((l) =>
        completedLessonIds.has(l.id)
      );
      const progress =
        allLessons.length > 0
          ? Math.round((completedLessons.length / allLessons.length) * 100)
          : 0;

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        durationMinutes: course.durationMinutes,
        moduleCount: course.modules.length,
        lessonCount: allLessons.length,
        progress,
        completedLessons: completedLessons.length,
        totalLessons: allLessons.length,
        enrolledAt: enrollment.enrolledAt,
      };
    });

    sendSuccess(res, { courses });
  } catch (error) {
    next(error);
  }
}

export async function getCourseById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const courseId = req.params.id;

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (!enrollment) {
      throw new ForbiddenError('Not enrolled in this course');
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                durationMinutes: true,
                order: true,
              },
            },
            assignments: {
              select: {
                id: true,
                title: true,
                dueDate: true,
              },
            },
            sessions: {
              where: {
                status: { in: ['SCHEDULED', 'LIVE', 'COMPLETED'] },
              },
              select: {
                id: true,
                title: true,
                scheduledAt: true,
                durationMinutes: true,
                status: true,
                joinUrl: true,
                recordingUrl: true,
              },
            },
          },
        },
        sessions: {
          where: {
            moduleId: null,
            status: { in: ['SCHEDULED', 'LIVE', 'COMPLETED'] },
          },
          select: {
            id: true,
            title: true,
            scheduledAt: true,
            durationMinutes: true,
            status: true,
            joinUrl: true,
            recordingUrl: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Get user's progress
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: { userId },
    });
    const completedLessonIds = new Set(
      lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );

    // Find current lesson
    let currentLessonId: string | null = null;
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!completedLessonIds.has(lesson.id)) {
          currentLessonId = lesson.id;
          break;
        }
      }
      if (currentLessonId) break;
    }

    // Enrich modules with progress
    const modulesWithProgress = course.modules.map((module) => {
      const completedInModule = module.lessons.filter((l) =>
        completedLessonIds.has(l.id)
      ).length;
      const progress =
        module.lessons.length > 0
          ? Math.round((completedInModule / module.lessons.length) * 100)
          : 0;

      return {
        id: module.id,
        title: module.title,
        description: module.description,
        objective: module.objective,
        order: module.order,
        progress,
        completedLessons: completedInModule,
        lessonCount: module.lessons.length,
        lessons: module.lessons.map((lesson) => ({
          ...lesson,
          isCompleted: completedLessonIds.has(lesson.id),
          isCurrent: lesson.id === currentLessonId,
        })),
        assignment: module.assignments[0] || null,
        sessions: module.sessions,
      };
    });

    const allLessons = course.modules.flatMap((m) => m.lessons);
    const completedLessons = allLessons.filter((l) =>
      completedLessonIds.has(l.id)
    );
    const overallProgress =
      allLessons.length > 0
        ? Math.round((completedLessons.length / allLessons.length) * 100)
        : 0;

    sendSuccess(res, {
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        durationMinutes: course.durationMinutes,
        progress: overallProgress,
        completedLessons: completedLessons.length,
        totalLessons: allLessons.length,
        modules: modulesWithProgress,
        sessions: course.sessions,
      },
    });
  } catch (error) {
    next(error);
  }
}
