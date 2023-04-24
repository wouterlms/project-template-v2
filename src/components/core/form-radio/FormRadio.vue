<script setup lang="ts">
import { useVModel } from '@wouterlms/composables'

import { useComponentAttrs } from '@/composables/ui'
import type { Color } from '@/theme'
import { colors, getColor } from '@/theme'

interface Props {
  /**
   * The current value of the component.
   */
  modelValue: unknown

  /**
   * The value of the radio input.
   */
  value: unknown

  /**
   * Determines whether the radio input should be disabled or not.
   */
  isDisabled?: boolean

  /**
   * Determines whether the radio input should be readonly or not.
   */
  isReadonly?: boolean

  /**
   * Determines whether the radio input should be in an error state or not.
   */
  hasError?: boolean

  /**
   * The accent color of the radio input.
   * This can be a theme color or a hex color.
   */
  accentColor?: Color | string

  /**
   * The border color of the radio input.
   * This can be a theme color or a hex color.
   */
  borderColor?: Color | string
}

const {
  accentColor,
  borderColor,
  hasError = false,
  isDisabled = false,
  isReadonly = false,
  modelValue,
  value,
} = defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: unknown): void
  (event: 'focus', e: FocusEvent): void
  (event: 'blur', e: FocusEvent): void
}>()

const selectedValue = useVModel(computed<unknown>(() => modelValue))

const slots = useSlots()
const attrs = useComponentAttrs()

const isFocused = ref<boolean>(false)

const hasDefaultSlotContent = computed<boolean>(
  () => slots.default != null && slots.default().length > 0,
)

const hasDescriptionSlotContent = computed<boolean>(
  () => slots.description != null && slots.description().length > 0,
)

const isChecked = computed<boolean>(
  () => JSON.stringify(value) === JSON.stringify(selectedValue.value),
)

const computedAccentColor = computed<string>(() => {
  if (accentColor == null)
    return colors['accent-primary']

  return getColor(accentColor)
})

const computedBorderColor = computed<string>(() => {
  if (hasError)
    return colors['accent-danger']

  if (isChecked.value || isFocused.value)
    return computedAccentColor.value

  if (borderColor == null)
    return colors['border-input']

  return getColor(borderColor)
})

const onClick = (): void => {
  selectedValue.value = value
}

const onFocus = (event: FocusEvent): void => {
  isFocused.value = true
  emit('focus', event)
}

const onBlur = (event: FocusEvent): void => {
  isFocused.value = false
  emit('blur', event)
}

const onKeyDown = (event: KeyboardEvent): void => {
  if (event.key === ' ') {
    onClick()
    event.preventDefault()
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <label
    v-bind="attrs.styling"
    class="flex gap-x-2"
  >
    <button
      v-bind="{
        ...attrs.functional,
        ...attrs.listeners,
      }"
      :aria-checked="isChecked"
      :aria-disabled="isDisabled"
      :aria-pressed="isChecked"
      :aria-readonly="isReadonly"
      :class="[
        {
          'opacity-50': isDisabled,
          'cursor-not-allowed': isDisabled,
        },
      ]"
      :disabled="isDisabled"
      :readonly="isReadonly"
      :style="{
        borderColor: computedBorderColor,
        outlineColor: computedBorderColor,
      }"
      class="flex h-[1.125em] w-[1.125em] shrink-0 items-center justify-center rounded-full border-[1.5px] border-solid outline-offset-[3px] duration-200"
      role="radio"
      type="button"
      @blur="onBlur"
      @click="onClick"
      @focus="onFocus"
      @keydown="onKeyDown"
    >
      <Transition
        enter-active-class="duration-200"
        enter-from-class="scale-50 opacity-0"
        leave-active-class="duration-200"
        leave-to-class="scale-50 opacity-0"
      >
        <div v-if="isChecked">
          <div
            :style="{
              backgroundColor: computedAccentColor,
            }"
            class="h-[0.7em] w-[0.7em] rounded-full"
          />
        </div>
      </Transition>
    </button>

    <div
      v-if="hasDefaultSlotContent || hasDescriptionSlotContent"
      class="-mt-0.5"
    >
      <AppText
        v-if="hasDefaultSlotContent"
        variant="body-2"
      >
        <slot
          :is-checked="isChecked"
          :is-focused="isFocused"
        />
      </AppText>

      <AppText
        v-if="hasDescriptionSlotContent"
        class="!text-tertiary max-w-xs"
        variant="body-1"
      >
        <slot name="description" />
      </AppText>
    </div>
  </label>
</template>
