/**
 * Course-related types
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  durationMinutes: number;
  moduleCount: number;
  lessonCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseWithProgress extends Course {
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt?: string;
  currentLesson?: {
    id: string;
    title: string;
    moduleId: string;
    moduleTitle: string;
  };
}

export interface CourseDetails extends Course {
  modules: ModuleWithLessons[];
  progress: number;
  completedLessons: number;
  totalLessons: number;
  sessions: LiveSessionSummary[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  objective?: string;
  order: number;
  lessonCount: number;
}

export interface ModuleWithLessons extends Module {
  lessons: LessonSummary[];
  progress: number;
  completedLessons: number;
  assignment?: AssignmentSummary;
  sessions: LiveSessionSummary[];
}

export interface LessonSummary {
  id: string;
  title: string;
  durationMinutes: number;
  order: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface AssignmentSummary {
  id: string;
  title: string;
  dueDate?: string;
  isSubmitted: boolean;
}

export interface LiveSessionSummary {
  id: string;
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
  joinUrl?: string;
  recordingUrl?: string;
}
