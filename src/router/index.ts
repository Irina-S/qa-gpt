import { createRouter, createWebHistory } from 'vue-router';

import { UserLayout } from '@/modules/UserLayout';
import { projectRoutes } from '@/modules/ProjectPage';
import { loginRoutes } from '@/modules/LoginPage';
import { isLoggedIn } from '@/shared/utils/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: UserLayout,
      children: [...projectRoutes],
      meta: {
        requireAuth: true
      }
    },
    ...loginRoutes
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthorized = isLoggedIn();
  if (!isAuthorized && Boolean(to.meta?.requireAuth)) next({ name: 'login' });
  else next();
});

export default router;
