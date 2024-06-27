import type { RouteRecordRaw } from 'vue-router';

export const threadRoutes: RouteRecordRaw[] = [
  {
    path: 'thread/:threadId',
    name: 'thread',
    component: () => import('./ThreadPage.vue')
  }
];
