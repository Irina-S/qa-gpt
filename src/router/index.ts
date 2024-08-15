import { createRouter, createWebHistory } from 'vue-router';

import { isLoggedIn } from '@/utils/auth';
import { BaseLayout } from '@/layouts/BaseLayout';
import LoginLayout from '@/layouts/LoginLayout/LoginLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        requireAuth: true,
        layout: 'base'
      },
      children: [
        {
          path: '/project/:projectId',
          name: 'project',
          component: () => import('@/pages/ProjectPage/ProjectPage.vue'),
          children: [
            {
              path: 'thread/:threadId',
              name: 'thread',
              component: () => import('@/pages/ThreadPage/ThreadPage.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'login'
      },
      component: () => import('@/pages/LoginPage/LoginPage.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthorized = isLoggedIn();
  if (!isAuthorized && Boolean(to.meta?.requireAuth)) next({ name: 'login' });
  else next();
});

export default router;
