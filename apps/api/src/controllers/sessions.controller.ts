import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { sendSuccess } from '../utils/response.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';
import { addDays } from 'date-fns';

export async function getUpcomingSessions(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const days = parseInt(req.query.days as string) || 7;
    const now = new Date();
    const endDate = addDays(now, days);

    // Get enrolled courses
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      select: { courseId: true },
    });

    const courseIds = enrollments.map((e) => e.courseId);

    const sessions = await prisma.liveSession.findMany({
      where: {
        courseId: { in: courseIds },
        scheduledAt: {
          gte: now,
          lte: endDate,
        },
        status: { in: ['SCHEDULED', 'LIVE'] },
      },
      include: {
        course: { select: { id: true, title: true } },
        module: { select: { id: true, title: true } },
      },
      orderBy: { scheduledAt: 'asc' },
    });

    const formattedSessions = sessions.map((session) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      scheduledAt: session.scheduledAt,
      durationMinutes: session.durationMinutes,
      status: session.status,
      joinUrl: session.status === 'LIVE' ? session.joinUrl : null,
      courseId: session.course.id,
      courseTitle: session.course.title,
      moduleId: session.module?.id,
      moduleTitle: session.module?.title,
    }));

    sendSuccess(res, { sessions: formattedSessions });
  } catch (error) {
    next(error);
  }
}

export async function getSessionById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const sessionId = req.params.id;

    const session = await prisma.liveSession.findUnique({
      where: { id: sessionId },
      include: {
        course: { select: { id: true, title: true } },
        module: { select: { id: true, title: true } },
      },
    });

    if (!session) {
      throw new NotFoundError('Session not found');
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: session.courseId },
      },
    });

    if (!enrollment) {
      throw new ForbiddenError('Not enrolled in this course');
    }

    sendSuccess(res, {
      session: {
        id: session.id,
        title: session.title,
        description: session.description,
        scheduledAt: session.scheduledAt,
        durationMinutes: session.durationMinutes,
        status: session.status,
        joinUrl: session.status === 'LIVE' ? session.joinUrl : null,
        recordingUrl: session.status === 'COMPLETED' ? session.recordingUrl : null,
        course: session.course,
        module: session.module,
      },
    });
  } catch (error) {
    next(error);
  }
}
