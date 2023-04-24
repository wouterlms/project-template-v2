import type { Component } from 'vue'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { auth } from '@/middleware'
import authRoutes from '@/modules/auth/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: async (): Promise<Component> => await import('@/components/layout/AppLayout.vue'),
      meta: {
        middleware: [auth],
      },
      children: [
        /**
         * Authenticated routes
         */
      ],
    },
    ...authRoutes,
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
