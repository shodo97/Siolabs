import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLessonById, completeLesson, updateVideoProgress } from '@/lib/api';

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => getLessonById(lessonId),
    enabled: !!lessonId,
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeLesson,
    onSuccess: (_data, lessonId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course'] });
      queryClient.invalidateQueries({ queryKey: ['module'] });
    },
  });
}

export function useUpdateVideoProgress() {
  return useMutation({
    mutationFn: ({ lessonId, positionSeconds }: { lessonId: string; positionSeconds: number }) =>
      updateVideoProgress(lessonId, positionSeconds),
  });
}
