import type {
  ComputedRef,
  Ref,
  VNode,
} from 'vue'

import { useEventListener, useVModel } from '@wouterlms/composables'

import AppModalWrapper from './AppModalWrapper.vue'
import { usePropsWithDefaults } from '@/composables/ui'

export interface BaseProps {
  /**
   * @modal
   * Show modal
   */
  show: boolean

  /**
    * Close modal when `escape` key is pressed
    */
  closeOnEscape?: boolean

  /**
    * Trap focus
    */
  trapFocus?: boolean
}

const defaultProps = {
  closeOnEscape: true,
  trapFocus: true,
}

type UseAppModal = () => {
  modalWrapper: ComputedRef<VNode>
  close: () => void
  state: {
    isVisible: boolean
  }
}

const useAppModal: UseAppModal = () => {
  const props = usePropsWithDefaults(defaultProps, useAttrs() as unknown as BaseProps)

  const showModal = useVModel<boolean>(toRef(useAttrs(), 'show') as Ref<boolean>, 'show')

  const close = (): void => {
    showModal.value = false
  }

  watch(
    showModal,
    (show) => {
      document.body.style.overflow = show ? 'hidden' : 'auto'
    },
    { immediate: true },
  )

  if (props.value.closeOnEscape) {
    useEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape' && showModal.value) {
        e.preventDefault()
        showModal.value = false
      }
    })
  }

  onBeforeUnmount(() => (
    document.body.style.overflow = 'auto'
  ))

  const modalWrapper = computed<VNode>(() => h(AppModalWrapper, {
    isActive: showModal.value && props.value.trapFocus,
  }))

  return {
    modalWrapper,
    close,
    state: reactive<{
      isVisible: boolean
    }>({
      isVisible: computed<boolean>(() => showModal.value) as unknown as boolean,
    }),
  }
}

export default useAppModal
