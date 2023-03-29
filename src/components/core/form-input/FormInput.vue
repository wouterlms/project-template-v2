<script setup lang="ts">
import type { Props as BaseProps } from './useFormInput'

import useFormInput from './useFormInput'

import {
  useBorderRadius,
  useComponentAttrs,
  useIsKeyboardMode,
} from '@/composables/ui'

import { icons } from '@/icons'
import { colors } from '@/theme'
import type { Rounded } from '@/models'

interface Props extends BaseProps {
  /**
   * Input error
   */
  errors?: { _errors: string[] }

  /**
   * Left icon
   */
  iconLeft?: string

  /**
   * Right icon
   */
  iconRight?: string

  /**
   * Icon left size
   */
  iconLeftSize?: string

  /**
   * Icon right size
   */
  iconRightSize?: string

  /**
   * Border color
   */
  borderColor?: string

  /**
   * Input padding
   */
  padding?: string

  /**
   * Border radius
   */
  rounded?: Rounded

  isTouched?: boolean
  label?: string
}

const {
  errors,
  iconLeft,
  iconRight,
  iconLeftSize = '0.9375em',
  iconRightSize = '0.9375em',
  borderColor,
  padding = '0.6em',
  isTouched = false,
  label,
  // eslint-disable-next-line unused-imports/no-unused-vars
  rounded = 'default',
} = defineProps<Props>()

const {
  input,
  state,
  togglePassword,
} = useFormInput()

const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const isKeyboardMode = useIsKeyboardMode()

const hasError = computed<boolean>(() => errors != null && errors._errors.length > 0 && isTouched)

const iconColor = computed<string>(() => {
  if (hasError.value)
    return colors['accent-danger']

  return colors['text-tertiary']
})

const color = computed<string>(() => {
  const { isDisabled } = state.value

  if (isDisabled)
    return colors['text-input-disabled']

  if (hasError.value)
    return colors['accent-danger']

  return colors['text-input']
})

const computedBorderColor = computed<string>(() => {
  const { isFocused } = state.value

  if (hasError.value)
    return colors['accent-danger']

  if (isFocused)
    return colors['accent-primary']

  return borderColor ?? colors['border-input']
})

const backgroundColor = computed<string>(() => {
  const { isDisabled } = state.value

  if (isDisabled === true)
    return colors['bg-input-disabled']

  return colors['bg-input']
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <FormLabel
    :label="label"
    :errors="errors"
    :is-touched="isTouched"
  >
    <label
      v-bind="stylingAttrs"
      :class="{
        'opacity-50': state.isDisabled,
      }"
      :style="{
        borderColor: computedBorderColor,
        color,
        backgroundColor,
        outlineColor: state.isFocused && isKeyboardMode
          ? computedBorderColor
          : 'transparent',
        borderRadius: useBorderRadius(),
      }"
      class="flex items-center border border-solid outline outline-2 outline-offset-2 duration-200"
    >
      <AppIcon
        v-if="iconLeft"
        :icon="iconLeft"
        :style="{
          width: iconLeftSize,
          color: iconColor,
        }"
        class="ml-[0.625em] shrink-0"
      />

      <slot name="left" />

      <slot
        v-if="$slots.input"
        name="input"
      />

      <Component
        v-bind="{
          ...listenerAttrs,
          ...nonStylingAttrs,
          type: state.isPasswordVisible ? 'text' : state.type,
        }"
        :is="input"
        :class="{
          'pointer-events-none absolute opacity-0': $slots.input,
        }"
        :style="{
          padding,
        }"
        class="w-full !outline-none"
      />

      <slot name="right" />

      <AppLoader
        v-if="state.isLoading"
        :accent-color="colors['text-input']"
        class="mr-[1em] text-[0.8em]"
      />

      <AppIcon
        v-else-if="iconRight"
        :icon="iconRight"
        :style="{
          width: iconRightSize,
          color: iconColor,
        }"
        class="mr-[0.625em] shrink-0"
      />

      <AppButton
        v-else-if="state.type === 'password'"
        :icon-left="state.isPasswordVisible
          ? icons.EYE
          : icons.EYE_SLASH"
        :is-disabled="state.isDisabled || state.isReadonly"
        :accent-color="color"
        rounded="rounded-sm"
        variant="ghost"
        padding="0.2em"
        class="mr-[0.5em]"
        @click="togglePassword"
      />
    </label>
  </FormLabel>
</template>

<style scoped lang="scss">
:deep input,
:deep textarea {
  &::placeholder {
    @apply text-input-placeholder;
  }
}

input[type=time]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
