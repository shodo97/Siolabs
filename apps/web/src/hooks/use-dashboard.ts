import { useQuery } from '@tanstack/react-query';
import type { CourseWithProgress, UpcomingSession } from '@/types';

interface DashboardData {
  courses: CourseWithProgress[];
  upcomingSessions: UpcomingSession[];
  continueLearning: CourseWithProgress | null;
}

// Dummy data for development
const DUMMY_DASHBOARD_DATA: DashboardData = {
  continueLearning: {
    id: 'course-1',
    title: 'AI Fundamentals',
    description: 'Master the foundations of Artificial Intelligence with hands-on projects and real-world applications.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    durationMinutes: 510,
    moduleCount: 12,
    lessonCount: 48,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    progress: 35,
    completedLessons: 17,
    totalLessons: 48,
    lastAccessedAt: new Date().toISOString(),
    currentLesson: {
      id: 'lesson-18',
      title: 'Neural Network Basics',
      moduleId: 'module-4',
      moduleTitle: 'Introduction to Deep Learning',
    },
  },
  courses: [
    {
      id: 'course-1',
      title: 'AI Fundamentals',
      description: 'Master the foundations of Artificial Intelligence with hands-on projects.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      durationMinutes: 510,
      moduleCount: 12,
      lessonCount: 48,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      progress: 35,
      completedLessons: 17,
      totalLessons: 48,
      lastAccessedAt: new Date().toISOString(),
      currentLesson: {
        id: 'lesson-18',
        title: 'Neural Network Basics',
        moduleId: 'module-4',
        moduleTitle: 'Introduction to Deep Learning',
      },
    },
    {
      id: 'course-2',
      title: 'Machine Learning Mastery',
      description: 'Learn ML algorithms from scratch and implement real-world solutions.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      durationMinutes: 720,
      moduleCount: 15,
      lessonCount: 60,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z',
      progress: 68,
      completedLessons: 41,
      totalLessons: 60,
      lastAccessedAt: new Date(Date.now() - 86400000).toISOString(),
      currentLesson: {
        id: 'lesson-42',
        title: 'Random Forest Implementation',
        moduleId: 'module-8',
        moduleTitle: 'Ensemble Methods',
      },
    },
    {
      id: 'course-3',
      title: 'Deep Learning with PyTorch',
      description: 'Build neural networks and deep learning models using PyTorch.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
      durationMinutes: 960,
      moduleCount: 18,
      lessonCount: 72,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z',
      progress: 12,
      completedLessons: 9,
      totalLessons: 72,
      lastAccessedAt: new Date(Date.now() - 172800000).toISOString(),
      currentLesson: {
        id: 'lesson-10',
        title: 'Tensor Operations',
        moduleId: 'module-2',
        moduleTitle: 'PyTorch Basics',
      },
    },
  ],
  upcomingSessions: [
    {
      id: 'session-1',
      title: 'Q&A: Neural Networks Deep Dive',
      description: 'Live session covering advanced neural network concepts and your questions.',
      scheduledAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      durationMinutes: 60,
      status: 'SCHEDULED',
      joinUrl: 'https://meet.siolabs.com/session-1',
      courseTitle: 'AI Fundamentals',
      moduleTitle: 'Introduction to Deep Learning',
    },
    {
      id: 'session-2',
      title: 'Project Review: ML Pipeline',
      description: 'Review and feedback session for your ML pipeline assignments.',
      scheduledAt: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      durationMinutes: 90,
      status: 'SCHEDULED',
      joinUrl: 'https://meet.siolabs.com/session-2',
      courseTitle: 'Machine Learning Mastery',
      moduleTitle: 'Ensemble Methods',
    },
    {
      id: 'session-3',
      title: 'Office Hours: PyTorch Questions',
      description: 'Open office hours for any PyTorch-related questions.',
      scheduledAt: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      durationMinutes: 45,
      status: 'SCHEDULED',
      joinUrl: 'https://meet.siolabs.com/session-3',
      courseTitle: 'Deep Learning with PyTorch',
      moduleTitle: 'PyTorch Basics',
    },
  ],
};

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<DashboardData> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return DUMMY_DASHBOARD_DATA;
    },
  });
}
