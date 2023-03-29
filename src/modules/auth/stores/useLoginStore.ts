import { defineStore } from 'pinia'

import { useLocalStorage } from '@/composables'

import { LocalStorageKey } from '@/enums'
import type { LastLoggedInUser } from '@/models'

export default defineStore('login', () => {
  const lastLoggedInUser = useLocalStorage(LocalStorageKey.LAST_LOGGED_IN_USER)

  const setLastLoggedInUser = (user: Nullable<LastLoggedInUser>): void => {
    lastLoggedInUser.value = user
  }

  return {
    lastLoggedInUser: readonly(lastLoggedInUser),
    setLastLoggedInUser,
  }
})
