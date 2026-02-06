import { apiClient } from './client';
import type { CourseWithProgress, UpcomingSession } from '@/types';

interface DashboardResponse {
  courses: CourseWithProgress[];
  upcomingSessions: UpcomingSession[];
  continueLearning: CourseWithProgress | null;
}

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await apiClient.get<{ success: true; data: DashboardResponse }>(
    '/dashboard'
  );
  return response.data;
}
