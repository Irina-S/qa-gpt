import { createRouter, createWebHistory } from 'vue-router';

import { BaseLayout } from '@/modules/BaseLayout';
import { projectRoutes } from '@/modules/ProjectPage';
import { loginRoutes } from '@/modules/LoginPage';
import { isLoggedIn } from '@/utils/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: BaseLayout,
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
