import { useQuery } from '@tanstack/react-query';
import { getModuleById } from '@/lib/api';

export function useModule(moduleId: string) {
  return useQuery({
    queryKey: ['module', moduleId],
    queryFn: () => getModuleById(moduleId),
    enabled: !!moduleId,
  });
}
