import type { LastLoggedInUser } from './lastLoggedInUser.model'
import type { LocalStorageKey } from '@/enums'

export interface LocalStorageValue {
  [LocalStorageKey.LAST_LOGGED_IN_USER]: Nullable<LastLoggedInUser>
}
