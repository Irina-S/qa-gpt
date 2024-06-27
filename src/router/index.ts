import { createRouter, createWebHistory } from 'vue-router'

import { UserLayout } from '@/modules/UserLayout'
import { projectRoutes } from '@/modules/ProjectPage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserLayout,
      children: [...projectRoutes]
    }
  ]
})

export default router
