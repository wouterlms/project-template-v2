import type { LastLoggedInUser } from './LastLoggedInUser.model'
import type { LocalStorageKey } from '@/enums'

export interface LocalStorageValue {
  [LocalStorageKey.LAST_LOGGED_IN_USER]: LastLoggedInUser
}
