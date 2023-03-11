import { useDebounceWatch } from '@wouterlms/composables'
import type { Ref } from 'vue'

type UseDebounceRef = <T>(ref: Ref<T>, ms: number) => Ref<T>

const useDebounceRef: UseDebounceRef = (ref, ms) => {
  const debouncedRef = ref

  useDebounceWatch(ref, (value) => {
    debouncedRef.value = value
  }, ms)

  return debouncedRef
}

export default useDebounceRef
