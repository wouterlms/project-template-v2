import type { RouteLocationRaw } from 'vue-router'

export type RouteMiddleware = () => Promise<RouteLocationRaw | string | undefined>
