import { apiClient } from './client';
import type { UpcomingSession, LiveSessionWithContext } from '@/types';

interface SessionsResponse {
  sessions: UpcomingSession[];
}

interface SessionResponse {
  session: LiveSessionWithContext;
}

export async function getUpcomingSessions(days?: number): Promise<UpcomingSession[]> {
  const response = await apiClient.get<{ data: SessionsResponse }>('/sessions', { days });
  return response.data.sessions;
}

export async function getSessionById(sessionId: string): Promise<LiveSessionWithContext> {
  const response = await apiClient.get<{ data: SessionResponse }>(`/sessions/${sessionId}`);
  return response.data.session;
}
