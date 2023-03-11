import { defineStore } from 'pinia'
import type { Profile } from '@/models'

export default defineStore('auth', () => {
  const user = ref<Nullable<Profile>>(null)

  const setUser = (value: Nullable<Profile>): void => {
    user.value = value
  }

  return {
    user: readonly(user),
    setUser,
  }
})
