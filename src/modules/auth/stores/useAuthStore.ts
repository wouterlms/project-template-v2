import { defineStore } from 'pinia'
import type { AuthenticatedUser } from '@/models'

export default defineStore('auth', () => {
  const user = ref<Nullable<AuthenticatedUser>>(null)

  const setUser = (value: Nullable<AuthenticatedUser>): void => {
    user.value = value
  }

  const getAuthenticatedUser = (): AuthenticatedUser => {
    if (user.value == null)
      throw new Error('User is not authenticated')

    return user.value
  }

  return {
    user: computed<Nullable<AuthenticatedUser>>(() => user.value),
    getAuthenticatedUser,
    setUser,
  }
})
