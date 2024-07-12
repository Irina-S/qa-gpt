import type { RouteRecordRaw } from 'vue-router';
import { threadRoutes } from '../ThreadPage';

export const projectRoutes: RouteRecordRaw[] = [
  {
    path: '/project/:projectId',
    name: 'project',
    component: () => import('./ProjectPage.vue'),
    children: [...threadRoutes]
  }
];
