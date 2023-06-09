import { useLocalStorage } from '@wouterlms/composables'
import type { Ref } from 'vue'

import type { LocalStorageKey } from '@/enums'
import type { LocalStorageValue } from '@/models'

export default <T extends LocalStorageKey>(
  key: T,
  defaultValue: Nullable<LocalStorageValue[T]> = null,
): Ref<LocalStorageValue[T]> => (
  useLocalStorage(key, defaultValue) as Ref<LocalStorageValue[T]>
)
