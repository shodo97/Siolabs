/**
 * Application-wide constants
 */

export const APP_NAME = 'SioLabs';
export const APP_DESCRIPTION = 'AI/ML Learning Platform';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// Video player
export const VIDEO_SAVE_INTERVAL_MS = 5000; // Save progress every 5 seconds
export const VIDEO_COMPLETION_THRESHOLD = 0.8; // 80% watched = can mark complete

// Progress thresholds
export const PROGRESS_THRESHOLDS = {
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  COMPLETE: 100,
} as const;

// Session status
export const SESSION_STATUS = {
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'siolabs_token',
  THEME: 'siolabs_theme',
  VIDEO_PROGRESS: 'siolabs_video_progress',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE: (id: string) => `/courses/${id}`,
  MODULE: (courseId: string, moduleId: string) => `/courses/${courseId}/modules/${moduleId}`,
  LESSON: (courseId: string, moduleId: string, lessonId: string) =>
    `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
} as const;

// Analytics events
export const ANALYTICS_EVENTS = {
  DASHBOARD_VIEWED: 'dashboard_viewed',
  COURSE_OPENED: 'course_opened',
  LESSON_STARTED: 'lesson_started',
  LESSON_COMPLETED: 'lesson_completed',
  CONTINUE_LEARNING_CLICKED: 'continue_learning_clicked',
  ASSIGNMENT_CTA_CLICKED: 'assignment_cta_clicked',
  LIVE_SESSION_VIEWED: 'live_session_viewed',
} as const;
