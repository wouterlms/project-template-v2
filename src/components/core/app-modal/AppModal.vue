<script setup lang="ts">
import { GAMING_XMARK } from '@wouterlms/icons'

import AppModalOverlay from './AppModalOverlay.vue'

import type { Props as BaseProps } from './useAppModal'
import useAppModal from './useAppModal'

import { useBorderRadius } from '@/composables/ui'
import type { Rounded } from '@/models'

interface Props extends BaseProps {
  /**
   * Show close button in top right corner
   */
  showCloseButton?: boolean

  /**
   * Close when clicking outside of the modal
   */
  closeOnClickOutside?: boolean

  /**
   * Blur background when modal is visible
   */
  hasBackgroundBlur?: boolean

  /**
   * Border radius
   */
  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
  closeOnClickOutside: true,
  hasBackgroundBlur: false,
  rounded: 'default',
})

const {
  modalWrapper,
  state,
  close,
} = useAppModal()

const handleOverlayClicked = (): void => {
  if (props.closeOnClickOutside)
    close()
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Component :is="modalWrapper">
    <Transition name="modal-transition">
      <div
        v-if="state.isVisible"
        v-bind="$attrs"
        :style="{
          borderRadius: useBorderRadius(),
        }"
        class="bg-primary
        fixed
        left-1/2
        top-1/2
        z-20
        flex
        -translate-x-1/2
        -translate-y-1/2
        flex-col
        justify-between
        overflow-hidden"
      >
        <slot :close="close" />

        <AppFocusable
          v-if="showCloseButton"
          type="button"
          class="bg-gray-secondary absolute right-3 top-3 rounded-full p-1"
          @click="close"
        >
          <AppIcon
            :icon="GAMING_XMARK"
            class="text-secondary w-3"
          />
        </AppFocusable>
      </div>
    </Transition>

    <Transition name="overlay-transition">
      <Component
        :is="AppModalOverlay"
        v-if="state.isVisible"
        :class="{
          'backdrop-blur-sm': hasBackgroundBlur,
        }"
        class="z-10"
        @click="handleOverlayClicked"
      />
    </Transition>
  </Component>
</template>

<style scoped lang="scss">
.overlay-transition {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.modal-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.22, 0.68, 0, 1.51);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1) !important;
  }
}
</style>
