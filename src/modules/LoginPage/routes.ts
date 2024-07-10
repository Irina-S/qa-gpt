import type { RouteRecordRaw } from 'vue-router';

export const loginRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./LoginPage.vue')
  }
];
