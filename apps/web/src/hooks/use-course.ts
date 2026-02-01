import { useQuery } from '@tanstack/react-query';
import { getEnrolledCourses, getCourseById } from '@/lib/api';

export function useEnrolledCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getEnrolledCourses,
  });
}

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });
}
