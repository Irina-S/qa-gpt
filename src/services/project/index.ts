import { $api } from '@/api/axios';
import type { Project } from '@/types/common';

export const getProjectsList = (getAllProjects = false) => {
  return $api.get<Project[]>(`/getAllProjects?getAllProjects=${getAllProjects}`);
};
