import { $api } from '@/components/config/api';
import type { Project } from './types';

export const getProjectsList = () => {
  return $api.get<Project[]>('/getAllProjects');
};
