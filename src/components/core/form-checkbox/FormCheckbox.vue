<script setup lang="ts">
import { PRIVACY_AND_SECURITY_CHECKMARK } from '@wouterlms/icons'

import type { Props as BaseProps } from './useFormCheckbox'
import useFormCheckbox from './useFormCheckbox'

import {
  useBorderRadius,
  useColor,
  useComponentAttrs,
} from '@/composables/ui'

import { colors, getColor } from '@/theme'

import type { Color } from '@/theme'
import type { Rounded } from '@/models'

interface Props extends BaseProps {
  hasError?: boolean
  accentColor?: Color | string
  backgroundColor?: Color | string
  borderColor?: Color | string

  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  hasError: false,
  rounded: 'sm',
  accentColor: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
})

const { checkbox, state } = useFormCheckbox()

const slots = useSlots()
const { isDarkColor } = useColor()

const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const computedAccentColor = computed<string>(
  () => props.accentColor == null
    ? colors['accent-primary']
    : getColor(props.accentColor),
)

const computedBackgroundColor = computed<string>(() => {
  if (state.value.isChecked) {
    if (props.hasError)
      return colors['accent-danger']

    return computedAccentColor.value
  }

  return props.backgroundColor == null
    ? colors['bg-input']
    : getColor(props.backgroundColor)
})

const computedBorderColor = computed<string>(() => {
  if (props.hasError)
    return colors['accent-danger']

  const { isChecked, isFocused } = state.value

  if (isChecked || isFocused)
    return computedAccentColor.value

  return props.borderColor == null
    ? colors['border-input']
    : getColor(props.borderColor)
})

const computedTickColor = computed<string>(
  () => (
    isDarkColor(computedBackgroundColor.value)
      ? '#ffffff'
      : '#000000'
  ),
)
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
      :class="[
        {
          'opacity-50': state.isDisabled,
        },
      ]"
      :style="{
        backgroundColor: computedBackgroundColor,
        borderColor: computedBorderColor,
        borderRadius: useBorderRadius(),
        outlineColor: computedBorderColor,
      }"
      class="flex
        h-[1.125em]
        w-[1.125em]
        shrink-0
        items-center
        justify-center
        border-[1.5px]
        border-solid
        outline-offset-[3px]
        duration-200"
    >
      <Transition name="tick-transition">
        <div v-if="state.isChecked">
          <AppIcon
            :icon="PRIVACY_AND_SECURITY_CHECKMARK"
            :style="{
              color: computedTickColor,
            }"
            class="w-[0.6875em]"
          />
        </div>
      </Transition>
    </Component>

    <span
      v-if="slots.default"
      :class="[
        hasError ? 'text-accent-danger' : 'text-secondary',
        {
          'opacity-50': state.isDisabled,
        },
      ]"
      class="ml-2"
    >
      <slot
        :is-checked="state.isChecked"
        :is-focused="state.isFocused"
        :is-disabled="state.isDisabled"
        :has-error="hasError"
      />
    </span>
  </Component>
</template>

<style scoped lang="scss">
.tick-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.22, 0.68, 0, 1);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
