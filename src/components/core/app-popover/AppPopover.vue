<script setup lang="ts">
import type { Placement } from '@floating-ui/dom'
import { useEventListener, useVModel } from '@wouterlms/composables'
import type { Ref, WritableComputedRef } from 'vue'

import { useFloatingUI } from '@/composables/ui'
import { clickOutside as vClickOutside } from '@/directives'
import { colors } from '@/theme'

interface Props {
  show?: boolean
  position?: Placement
  margin?: number
  offset?: number
  containerPadding?: number
  inheritWidth?: boolean
  showArrow?: boolean
  container?: HTMLElement
  backgroundColor?: string

  /**
   * The border radius of the popover.
   * Defaults to 'rounded'.
   */
  rounded?: 'rounded-2xl' | 'rounded-3xl' | 'rounded-full' | 'rounded-lg' | 'rounded-md' | 'rounded-none' | 'rounded-sm' | 'rounded-xl' | 'rounded'
}

const props = withDefaults(defineProps<Props>(), {
  show: undefined,
  position: 'bottom',
  margin: 0,
  offset: 0,
  containerPadding: 10,
  inheritWidth: false,
  showArrow: true,
  container: undefined,
  backgroundColor: undefined,
  rounded: 'rounded',
})

const isPopoverVisible: Ref<boolean> | WritableComputedRef<boolean> = props.show == null
  ? ref<boolean>(false)
  : useVModel(toRef(props, 'show'), 'show') as WritableComputedRef<boolean>

const previouslyFocusedElement = ref<HTMLElement | null>(null)

const container = ref<HTMLElement | null>(null)
const button = ref<HTMLElement | null>(null)
const popover = ref<HTMLElement | null>(null)
const arrow = ref<HTMLElement | null>(null)

const {
  actualPosition,
  arrowPositionX,
  arrowPositionY,
  positionX,
  positionY,
  width,
} = useFloatingUI({
  isFloatingElementVisible: computed<boolean>(() => isPopoverVisible.value),
  floatingEl: computed<Nullable<HTMLElement>>(() => popover.value ?? null),
  referenceEl: computed<Nullable<HTMLElement>>(() => button.value ?? null),
  arrowEl: computed<Nullable<HTMLElement>>(() => arrow.value ?? null),
  options: reactive<{
    margin: number
    offset: number
    position: Placement
    container: HTMLElement
    containerPadding: number
  }>({
  	margin: props.margin,
  	offset: props.offset,
  	position: props.position,
  	container: props.container ?? document.body,
  	containerPadding: props.containerPadding,
  }),
})

onMounted(() => {
  const children = container.value?.children ?? []

  if (children.length !== 1)
    throw new Error('<AppPopover> must have exactly one element in <slot>')

  button.value = children[0] as HTMLElement

  button.value.addEventListener('click', () => {
    isPopoverVisible.value = !isPopoverVisible.value
  })
})

const computedBackgroundColor = computed<string>(() => (
  props.backgroundColor ?? colors['bg-primary']
))

const closeAndFocusButton = (): void => {
  if (isPopoverVisible.value) {
    isPopoverVisible.value = false
    button.value?.focus()
  }
}

useEventListener('keydown', ({ key }: KeyboardEvent) => {
  if (key === 'Escape')
    closeAndFocusButton()
})

watch(isPopoverVisible, (isPopoverVisible) => {
  if (isPopoverVisible)
    previouslyFocusedElement.value = document.activeElement as HTMLElement
})

useEventListener(document, 'focusin', () => {
  if (!isPopoverVisible.value || popover.value === null)
    return

  const activeElement = document.activeElement as HTMLElement | null
  const isFocusInPopover = popover.value.contains(activeElement) || activeElement === button.value

  if (!isFocusInPopover)
    isPopoverVisible.value = false
})
</script>

<template>
  <div ref="container">
    <slot />

    <Transition name="popover">
      <div
        v-if="isPopoverVisible"
        ref="popover"
        v-click-outside="() => isPopoverVisible = false"
        :class="rounded"
        :style="{
          [actualPosition]: 'auto',
          top: `${positionY}px`,
          left: `${positionX}px`,
          width: inheritWidth ? `${width}px` : undefined,
          backgroundColor: computedBackgroundColor,
        }"
        class="shadow-primary absolute"
      >
        <div
          v-show="showArrow"
          ref="arrow"
          :style="{
            backgroundColor: computedBackgroundColor,
            left: arrowPositionX !== null ? `${arrowPositionX}px` : '',
            top: arrowPositionY !== null ? `${arrowPositionY}px` : '',
            right: '',
            bottom: '',
            [actualPosition]: '-4px',
          }"
          class="shadow-primary absolute h-3 w-3 rotate-45 rounded-sm"
        />

        <div
          :class="[rounded]"
          :style="{
            backgroundColor: computedBackgroundColor,
          }"
          class="relative left-0 top-0 z-[1] h-full w-full overflow-hidden"
        >
          <slot
            :close="closeAndFocusButton"
            name="popover"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.popover {
  &-enter-active,
  &-leave-active {
    transition-property: transform, opacity;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.22, 0.68, 0, 1.51);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.96);
  }
}
</style>
