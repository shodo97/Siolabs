import { apiClient } from './client';
import type { ModuleWithLessons } from '@/types';

interface ModuleResponse {
  module: ModuleWithLessons & {
    course: { id: string; title: string };
  };
}

export async function getModuleById(moduleId: string): Promise<ModuleResponse['module']> {
  const response = await apiClient.get<{ data: ModuleResponse }>(`/modules/${moduleId}`);
  return response.data.module;
}
