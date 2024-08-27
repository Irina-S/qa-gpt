import { $api } from '@/api/axios';
import type { Project } from '@/types/common';

export const getProjectsList = () => {
  return $api.get<Project[]>('/getAllProjects');
};
