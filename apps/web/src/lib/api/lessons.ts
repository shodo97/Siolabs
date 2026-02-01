import { apiClient } from './client';
import type { LessonDetails, LessonCompletionResponse } from '@/types';

interface LessonResponse {
  lesson: LessonDetails;
}

export async function getLessonById(lessonId: string): Promise<LessonDetails> {
  const response = await apiClient.get<{ data: LessonResponse }>(`/lessons/${lessonId}`);
  return response.data.lesson;
}

export async function completeLesson(lessonId: string): Promise<LessonCompletionResponse> {
  const response = await apiClient.post<{ data: LessonCompletionResponse }>(
    `/lessons/${lessonId}/complete`
  );
  return response.data;
}

export async function updateVideoProgress(
  lessonId: string,
  positionSeconds: number
): Promise<void> {
  await apiClient.put(`/lessons/${lessonId}/video-progress`, { positionSeconds });
}
