<script setup lang="ts">
import { useEventListener, useVModel } from '@wouterlms/composables'

interface Props {
  /**
   * Determines if modal should be shown.
   */
  show: boolean

  /**
   * Determines if modal should be closed when escape key is pressed.
   */
  dontCloseOnEscape?: boolean

  /**
   * Determines if focus trap should be disabled.
   */
  disableTrapFocus?: boolean

  /**
   * Determines if close button should be displayed in the top right corner.
   */
  hideCloseButton?: boolean

  /**
   * Determines if modal should be closed when clicked outside of it.
   */
  dontCloseOnClickOutside?: boolean

  /**
   * The border radius of the modal.
   * Possible values are: 'rounded-2xl', 'rounded-lg',
   * 'rounded-md', 'rounded-none', 'rounded-sm', 'rounded-xl', or 'rounded'.
   * Defaults to 'rounded-lg'.
   */
  rounded?: 'rounded-2xl' | 'rounded-lg' | 'rounded-md' | 'rounded-none' | 'rounded-sm' | 'rounded-xl' | 'rounded'
}

const {
  disableTrapFocus = false,
  dontCloseOnClickOutside = false,
  dontCloseOnEscape = false,
  hideCloseButton = false,
  rounded = 'rounded-lg',
  show,
} = defineProps<Props>()

const showModal = useVModel(computed<boolean>(() => show), 'show')

const close = (): void => {
  showModal.value = false
}

const onOverlayClicked = (): void => {
  if (!dontCloseOnClickOutside)
    close()
}

watch(showModal, (show) => {
  document.body.style.overflow = show ? 'hidden' : 'auto'
}, { immediate: true })

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showModal.value && !dontCloseOnEscape) {
    event.preventDefault()
    close()
  }
}, { target: document })

onBeforeUnmount(() => (
  document.body.style.overflow = 'auto'
))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <AppModalWrapper :disable-focus-trap="!showModal || disableTrapFocus">
    <Transition
      enter-active-class="duration-300 ease-modal"
      enter-from-class="opacity-0 scale-110"
      leave-active-class="duration-300 ease-modal"
      leave-to-class="opacity-0 scale-110"
    >
      <div
        v-if="showModal"
        v-bind="$attrs"
        :class="rounded"
        class="fixed left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between overflow-hidden bg-white"
      >
        <slot :close="close" />

        <AppFocusable
          v-if="!hideCloseButton"
          class="absolute right-3 top-3 rounded-full bg-neutral-200"
          @click="close"
        >
          <CloseIcon class="h-3 w-3" />
        </AppFocusable>
      </div>
    </Transition>

    <Transition
      enter-active-class="duration-300 ease-modal-overlay"
      enter-from-class="opacity-0"
      leave-active-class="duration-300 ease-modal-overlay"
      leave-to-class="opacity-0"
    >
      <AppModalOverlay
        v-if="showModal"
        class="z-10"
        @click="onOverlayClicked"
      />
    </Transition>
  </AppModalWrapper>
</template>
