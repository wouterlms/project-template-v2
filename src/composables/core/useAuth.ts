import { z } from 'zod'
import { useAuth } from '@appwise/vue-oauth2'
import type { UseAuth } from '@appwise/vue-oauth2'

import router from '@/router'

import { useAuthStore } from '@/modules/auth/stores'

import { Route } from '@/enums'
import { authenticatedUser } from '@/models'
import type { AuthenticatedUser } from '@/models'

export default (): Omit<UseAuth<AuthenticatedUser>, 'user'> => {
  const {
    VITE_API_BASE_URL,
    VITE_CLIENT_ID,
    VITE_CLIENT_SECRET,
  } = import.meta.env

  const envSchema = z.object({
    VITE_API_BASE_URL: z.string().url(),
    VITE_CLIENT_ID: z.string(),
    VITE_CLIENT_SECRET: z.string(),
  })

  try {
    envSchema.parse({
      VITE_API_BASE_URL,
      VITE_CLIENT_ID,
      VITE_CLIENT_SECRET,
    })
  }
  catch {
    throw new Error('API Base URL, Client ID, or Client Secret is not defined. Make sure to define `VITE_API_BASE_URL`, `VITE_CLIENT_ID`, and `VITE_CLIENT_SECRET` in your .env file.')
  }

  const authStore = useAuthStore()

  const auth = useAuth<AuthenticatedUser>({
    baseURL: VITE_API_BASE_URL,
    clientId: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
    autoRefreshAccessToken: true,
    endpoints: {
      userInfo: '/api/users/me',
      revoke: '',
    },
    onRefreshTokenFailed: () => {
      void router.push({ name: Route.LOGIN })
    },
  })

  const getUser = async (): Promise<AuthenticatedUser> => {
    const user = await auth.getUser()

    try {
      const parsedUser = authenticatedUser.parse(user)

      authStore.setUser(parsedUser)

      return parsedUser
    }
    catch (e) {
      console.error(e)

      throw e
    }
  }

  const signOut = (): void => {
    auth.signOut()
    authStore.setUser(null)
  }

  return {
    ...auth,
    getUser,
    signOut,
  }
}
