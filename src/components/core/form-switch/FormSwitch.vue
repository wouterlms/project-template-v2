<script setup lang="ts">
import type { Props as BaseProps } from '../form-checkbox/useFormCheckbox'
import useFormCheckbox from '../form-checkbox/useFormCheckbox'

import { useComponentAttrs } from '@/composables/ui'

import { colors } from '@/theme'

interface Props extends BaseProps {
  accentColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: true as any,
  accentColor: undefined,
})

const { checkbox, state } = useFormCheckbox()

const slots = useSlots()

const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const switchEl = ref<HTMLElement | null>(null)
const switchWidth = ref(0)
const padding = '1px'

let transition: string | null = null

onMounted(async () => {
  switchWidth.value = switchEl.value?.clientWidth ?? 0

  // Delay setting the transition to make sure if the initial
  // state is checked, it does not transition
  await nextTick()

  transition = '0.3s cubic-bezier(0.22, 0.68, 0, 1.1)'
})

const computedAccentColor = computed<string>(() => (
  props.accentColor ?? colors.value.accent.primary[500]
))

const thumbStyle = computed<{
  transition: string | undefined
  transform: string | undefined
}>(() => ({
  transition: transition ?? undefined,
  transform: state.value.isChecked
    ? `translateX(calc(${switchWidth.value}px - 100% - calc(${padding} * 2)))`
    : undefined,
}))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Component
    v-bind="stylingAttrs"
    :is="slots.default ? 'label' : 'div'"
    class="flex items-center"
  >
    <Component
      v-bind="{
        ...nonStylingAttrs,
        ...listenerAttrs,
      }"
      :is="checkbox"
      ref="switchEl"
      :class="[
        {
          'opacity-50': state.isDisabled,
        },
      ]"
      :style="{
        padding,
        backgroundColor: state.isChecked
          ? computedAccentColor
          : colors.background.switch,
        outlineColor: computedAccentColor,
      }"
      class="box-content
          min-w-[2em]
          rounded-[1rem]
          border
          border-solid
          border-transparent
          outline-offset-[3px]
          duration-200"
    >
      <div
        :style="thumbStyle"
        class="h-[1.2em] w-[1.2em] rounded-full bg-white shadow"
      />
    </Component>

    <span
      v-if="slots.default"
      :class="{
        'opacity-50': state.isDisabled,
      }"
      class="text-secondary ml-[0.5em]"
    >
      <slot />
    </span>
  </Component>
</template>