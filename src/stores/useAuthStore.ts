import { defineStore } from 'pinia'

import { useAuth } from '@/composables'
import type { AuthenticatedUser } from '@/models'

export default defineStore('auth', () => {
  const auth = useAuth()

  const user = ref<Nullable<AuthenticatedUser>>(null)

  const setUser = (value: Nullable<AuthenticatedUser>): void => {
    user.value = value
  }

  const getAuthenticatedUser = (): AuthenticatedUser => {
    if (user.value == null)
      throw new Error('User is not authenticated')

    return user.value
  }

  const signIn = async (email: string, password: string): Promise<AuthenticatedUser> => {
    await auth.signIn(email, password)
    const user = await auth.getUser()

    setUser(user)

    return user
  }

  return {
    user: computed<Nullable<AuthenticatedUser>>(() => user.value),
    getAuthenticatedUser,
    setUser,
    signIn,
  }
})
