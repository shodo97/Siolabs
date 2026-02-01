/**
 * Lesson-related types
 */

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  objective?: string;
  videoUrl: string;
  durationMinutes: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface LessonDetails extends Lesson {
  module: {
    id: string;
    title: string;
    courseId: string;
    courseTitle: string;
  };
  resources: Resource[];
  isCompleted: boolean;
  videoProgress?: number; // Position in seconds
  nextLesson?: {
    id: string;
    title: string;
    moduleId: string;
  };
  prevLesson?: {
    id: string;
    title: string;
    moduleId: string;
  };
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
}

export type ResourceType = 'PDF' | 'SLIDE' | 'CODE' | 'LINK' | 'OTHER';

export interface LessonCompletionResponse {
  success: boolean;
  progress: {
    lessonCompleted: boolean;
    moduleProgress: number;
    courseProgress: number;
  };
}

export interface VideoProgressUpdate {
  lessonId: string;
  positionSeconds: number;
}
