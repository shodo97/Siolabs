import { useQuery } from '@tanstack/react-query';
import { getUpcomingSessions, getSessionById } from '@/lib/api';

export function useUpcomingSessions(days?: number) {
  return useQuery({
    queryKey: ['sessions', 'upcoming', days],
    queryFn: () => getUpcomingSessions(days),
  });
}

export function useSession(sessionId: string) {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getSessionById(sessionId),
    enabled: !!sessionId,
  });
}
