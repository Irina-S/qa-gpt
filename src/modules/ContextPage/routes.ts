import type { RouteRecordRaw } from 'vue-router'

export const contextRoutes: RouteRecordRaw[] = [
  {
    path: 'context/:contextId',
    name: 'context',
    component: () => import('./ContextPage.vue')
  }
]
