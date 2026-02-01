import { apiClient } from './client';
import type { CourseWithProgress, CourseDetails } from '@/types';

interface CoursesResponse {
  courses: CourseWithProgress[];
}

interface CourseResponse {
  course: CourseDetails;
}

export async function getEnrolledCourses(): Promise<CourseWithProgress[]> {
  const response = await apiClient.get<{ data: CoursesResponse }>('/courses');
  return response.data.courses;
}

export async function getCourseById(courseId: string): Promise<CourseDetails> {
  const response = await apiClient.get<{ data: CourseResponse }>(`/courses/${courseId}`);
  return response.data.course;
}
