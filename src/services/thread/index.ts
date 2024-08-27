import { $api } from '@/api/axios';
import type { GetAllProjectThreadsResponse } from './types';

export const getAllProjectThreads = (projectId: string) => {
  return $api.get<GetAllProjectThreadsResponse>(`/getAllProjectThreads?projectId=${projectId}`);
};
