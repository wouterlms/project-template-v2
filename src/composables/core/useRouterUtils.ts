import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  RouteRecordNormalized,
} from 'vue-router'

import type { RouteMiddleware } from '@/models'

type UseRouterUtils = () => {
  initialiseMiddlewares: () => void
  initialiseStoreResets: () => void
}

const useRouterUtils: UseRouterUtils = () => {
  const router = useRouter()

  const hasMiddleware = (
    to: RouteRecordNormalized,
  ): to is RouteRecordNormalized & { meta: { middleware: RouteMiddleware[] } } =>
    to.meta.middleware != null

  const handleRouteMiddlewares = async (
    to: RouteLocationNormalized,
  ): Promise<RouteLocationRaw | undefined> => {
    const { matched } = to

    const middlewares = matched
      .filter(hasMiddleware)
      .map(({ meta }) => meta.middleware)
      .flat()

    for (const middleware of middlewares) {
      const result = await middleware()

      if (result !== undefined)
        return result
    }
  }

  const handleRouteStore = (to: RouteLocationNormalized, from: RouteLocationNormalized): void => {
    if (to.fullPath === from.fullPath)
      return

    const routes = router.getRoutes()
    const routesWithStores = routes.filter(({ meta }) => meta.store != null)

    for (const routeWithStore of routesWithStores) {
      const { path } = to
      const { meta, path: routeWithStorePath } = routeWithStore

      if (!path.startsWith(routeWithStorePath)) {
        const { store } = meta
        const { hasDataBeenFetched, reset } = store!()

        if (hasDataBeenFetched as boolean) {
          setTimeout(() => {
            reset()
          }, 1)
        }
      }
    }
  }

  const initialiseMiddlewares = (): void => {
    router.beforeEach(handleRouteMiddlewares)
  }

  const initialiseStoreResets = (): void => {
    router.afterEach(handleRouteStore)
  }

  return {
    initialiseMiddlewares,
    initialiseStoreResets,
  }
}

export default useRouterUtils
