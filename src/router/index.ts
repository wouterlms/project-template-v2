import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import authRoutes from '@/modules/auth/router'

import { auth } from '@/middleware'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: async () => await import('@/components/layout/AppLayout.vue'),
      meta: {
        middleware: [auth],
      },
      children: [],
    },
    ...authRoutes,
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
