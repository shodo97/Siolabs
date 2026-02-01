import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { sendSuccess } from '../utils/response.js';
import { addDays } from 'date-fns';

export async function getDashboard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const now = new Date();
    const nextWeek = addDays(now, 7);

    // Get enrolled courses with progress
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
      },
    });

    // Get lesson progress for user
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: { userId },
    });

    const completedLessonIds = new Set(
      lessonProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );

    // Calculate progress for each course
    const coursesWithProgress = enrollments.map((enrollment) => {
      const course = enrollment.course;
      const allLessons = course.modules.flatMap((m) => m.lessons);
      const completedLessons = allLessons.filter((l) =>
        completedLessonIds.has(l.id)
      );
      const progress =
        allLessons.length > 0
          ? Math.round((completedLessons.length / allLessons.length) * 100)
          : 0;

      // Find current lesson (first incomplete)
      let currentLesson = null;
      for (const module of course.modules.sort((a, b) => a.order - b.order)) {
        for (const lesson of module.lessons.sort((a, b) => a.order - b.order)) {
          if (!completedLessonIds.has(lesson.id)) {
            currentLesson = {
              id: lesson.id,
              title: lesson.title,
              moduleId: module.id,
              moduleTitle: module.title,
            };
            break;
          }
        }
        if (currentLesson) break;
      }

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
        currentLesson,
      };
    });

    // Get upcoming sessions (next 7 days)
    const enrolledCourseIds = enrollments.map((e) => e.courseId);
    const upcomingSessions = await prisma.liveSession.findMany({
      where: {
        courseId: { in: enrolledCourseIds },
        scheduledAt: {
          gte: now,
          lte: nextWeek,
        },
        status: { in: ['SCHEDULED', 'LIVE'] },
      },
      include: {
        course: {
          select: { id: true, title: true },
        },
        module: {
          select: { id: true, title: true },
        },
      },
      orderBy: { scheduledAt: 'asc' },
      take: 5,
    });

    const sessions = upcomingSessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      scheduledAt: session.scheduledAt,
      durationMinutes: session.durationMinutes,
      status: session.status,
      joinUrl: session.status === 'LIVE' ? session.joinUrl : null,
      courseTitle: session.course.title,
      moduleTitle: session.module?.title,
    }));

    // Find the course to continue (most recently accessed or first incomplete)
    const continueLearning = coursesWithProgress.find(
      (c) => c.progress < 100 && c.currentLesson
    );

    sendSuccess(res, {
      courses: coursesWithProgress,
      upcomingSessions: sessions,
      continueLearning: continueLearning || null,
    });
  } catch (error) {
    next(error);
  }
}
