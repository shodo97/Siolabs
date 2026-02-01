import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { sendSuccess } from '../utils/response.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export async function getModuleById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const moduleId = req.params.id;

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          select: { id: true, title: true },
        },
        lessons: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            durationMinutes: true,
            order: true,
          },
        },
        assignments: {
          select: {
            id: true,
            title: true,
            description: true,
            dueDate: true,
          },
        },
        sessions: {
          where: {
            status: { in: ['SCHEDULED', 'LIVE', 'COMPLETED'] },
          },
          orderBy: { scheduledAt: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            scheduledAt: true,
            durationMinutes: true,
            status: true,
            joinUrl: true,
            recordingUrl: true,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundError('Module not found');
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: module.courseId },
      },
    });

    if (!enrollment) {
      throw new ForbiddenError('Not enrolled in this course');
    }

    // Get lesson progress
    const lessonIds = module.lessons.map((l) => l.id);
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: {
        userId,
        lessonId: { in: lessonIds },
      },
    });

    const completedLessonIds = new Set(
      lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );

    // Find current lesson
    let currentLessonId: string | null = null;
    for (const lesson of module.lessons) {
      if (!completedLessonIds.has(lesson.id)) {
        currentLessonId = lesson.id;
        break;
      }
    }

    const lessonsWithProgress = module.lessons.map((lesson) => ({
      ...lesson,
      isCompleted: completedLessonIds.has(lesson.id),
      isCurrent: lesson.id === currentLessonId,
    }));

    const completedCount = lessonsWithProgress.filter((l) => l.isCompleted).length;
    const progress =
      module.lessons.length > 0
        ? Math.round((completedCount / module.lessons.length) * 100)
        : 0;

    sendSuccess(res, {
      module: {
        id: module.id,
        title: module.title,
        description: module.description,
        objective: module.objective,
        order: module.order,
        course: module.course,
        progress,
        completedLessons: completedCount,
        lessonCount: module.lessons.length,
        lessons: lessonsWithProgress,
        assignment: module.assignments[0] || null,
        sessions: module.sessions,
      },
    });
  } catch (error) {
    next(error);
  }
}
