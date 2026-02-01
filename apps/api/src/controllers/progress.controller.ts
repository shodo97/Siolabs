import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { sendSuccess } from '../utils/response.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export async function getUserProgress(
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
                lessons: { select: { id: true } },
              },
            },
          },
        },
      },
    });

    const allLessonIds = enrollments.flatMap((e) =>
      e.course.modules.flatMap((m) => m.lessons.map((l) => l.id))
    );

    const lessonProgress = await prisma.lessonProgress.findMany({
      where: {
        userId,
        lessonId: { in: allLessonIds },
      },
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
      const completedModules = course.modules.filter((m) =>
        m.lessons.every((l) => completedLessonIds.has(l.id))
      );

      const progress =
        allLessons.length > 0
          ? Math.round((completedLessons.length / allLessons.length) * 100)
          : 0;

      return {
        courseId: course.id,
        courseTitle: course.title,
        progress,
        completedLessons: completedLessons.length,
        totalLessons: allLessons.length,
        completedModules: completedModules.length,
        totalModules: course.modules.length,
        isCompleted: progress === 100,
      };
    });

    const totalCompleted = courses.filter((c) => c.isCompleted).length;
    const totalLessonsCompleted = courses.reduce(
      (sum, c) => sum + c.completedLessons,
      0
    );

    sendSuccess(res, {
      userId,
      courses,
      totalCoursesEnrolled: courses.length,
      totalCoursesCompleted: totalCompleted,
      totalLessonsCompleted,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCourseProgress(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const courseId = req.params.courseId;

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
              select: { id: true, title: true },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: {
        userId,
        lessonId: { in: lessonIds },
      },
    });

    const completedLessonIds = new Set(
      lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );

    const modules = course.modules.map((module) => {
      const completedInModule = module.lessons.filter((l) =>
        completedLessonIds.has(l.id)
      ).length;
      const progress =
        module.lessons.length > 0
          ? Math.round((completedInModule / module.lessons.length) * 100)
          : 0;

      return {
        moduleId: module.id,
        moduleTitle: module.title,
        progress,
        completedLessons: completedInModule,
        totalLessons: module.lessons.length,
        isCompleted: progress === 100,
        lessons: module.lessons.map((lesson) => ({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          isCompleted: completedLessonIds.has(lesson.id),
        })),
      };
    });

    const allLessons = course.modules.flatMap((m) => m.lessons);
    const completedCount = allLessons.filter((l) =>
      completedLessonIds.has(l.id)
    ).length;
    const overallProgress =
      allLessons.length > 0
        ? Math.round((completedCount / allLessons.length) * 100)
        : 0;

    sendSuccess(res, {
      courseId,
      courseTitle: course.title,
      progress: overallProgress,
      completedLessons: completedCount,
      totalLessons: allLessons.length,
      completedModules: modules.filter((m) => m.isCompleted).length,
      totalModules: modules.length,
      isCompleted: overallProgress === 100,
      modules,
    });
  } catch (error) {
    next(error);
  }
}
