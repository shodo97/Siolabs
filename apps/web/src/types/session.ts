/**
 * Live session-related types
 */

export type SessionStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export interface LiveSession {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  description?: string;
  scheduledAt: string;
  durationMinutes: number;
  joinUrl?: string;
  recordingUrl?: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LiveSessionWithContext extends LiveSession {
  course: {
    id: string;
    title: string;
  };
  module?: {
    id: string;
    title: string;
  };
}

export interface UpcomingSession {
  id: string;
  title: string;
  description?: string;
  scheduledAt: string;
  durationMinutes: number;
  status: SessionStatus;
  joinUrl?: string;
  courseTitle: string;
  moduleTitle?: string;
}
