import type { LocalStorageKey } from '@/enums'

import type { LastLoggedInUser } from './lastLoggedInUser.model'

export interface LocalStorageValue {
  [LocalStorageKey.LAST_LOGGED_IN_USER]: Nullable<LastLoggedInUser>
}
