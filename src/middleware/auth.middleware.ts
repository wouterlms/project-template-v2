import { useAuth } from '@/composables'

import { Route } from '@/enums'
import type { RouteMiddleware } from '@/models'

const auth: RouteMiddleware = async () => {
  const { getUser, isAuthenticated } = useAuth()

  try {
    if (!isAuthenticated.value)
      await getUser()
  }
  catch {
    return {
      name: Route.LOGIN,
    }
  }
}

export default auth
