import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from '@/store/user';

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

// @@TODO: вернуть кастомную страницу авторизации по возможности
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();

//   if (!userStore.isAuthorized && Boolean(to.meta?.requireAuth)) next({ name: 'login' });
//   else next();
// });

export default router;
