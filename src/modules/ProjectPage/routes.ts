import type { RouteRecordRaw } from 'vue-router'
import { contextRoutes } from '../ContextPage'

export const projectRoutes: RouteRecordRaw[] = [
  {
    path: '/project/:projectId',
    name: 'project',
    component: () => import('./ProjectPage.vue'),
    children: [...contextRoutes]
  }
]
