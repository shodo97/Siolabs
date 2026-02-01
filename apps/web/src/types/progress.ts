/**
 * Progress-related types
 */

export interface UserProgress {
  userId: string;
  courses: CourseProgress[];
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalLessonsCompleted: number;
  totalTimeSpentMinutes: number;
}

export interface CourseProgress {
  courseId: string;
  courseTitle: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  lastAccessedAt?: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface ModuleProgress {
  moduleId: string;
  moduleTitle: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  isCompleted: boolean;
}

export interface LessonProgress {
  lessonId: string;
  lessonTitle: string;
  isCompleted: boolean;
  completedAt?: string;
  videoPosition?: number;
  lastAccessedAt?: string;
}
