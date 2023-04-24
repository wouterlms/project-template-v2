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
   * The value of the switch.
   * Defaults to `true`
   */
  value?: boolean | unknown

  /**
   * Determines whether the switch should be disabled or not.
   */
  isDisabled?: boolean

  /**
   * Determines whether the switch should be readonly or not.
   */
  isReadonly?: boolean

  /**
   * Determines whether the switch should be in an error state or not.
   */
  hasError?: boolean

  /**
   * The accent color of the switch.
   * This can be a theme color or a hex color.
   */
  accentColor?: Color | string

  /**
   * The background color of the switch.
   * This can be a theme color or a hex color.
   */
  backgroundColor?: Color | string

  /**
   * The border color of the switch.
   * This can be a theme color or a hex color.
   */
  borderColor?: Color | string

  /**
   * The color of the checkmark.
   * This can be a theme color or a hex color.
   */
  checkmarkColor?: Color | string
}

const {
  accentColor,
  backgroundColor,
  borderColor,
  checkmarkColor,
  hasError = false,
  isDisabled = false,
  isReadonly = false,
  modelValue,
  value = true,
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

const switchEl = ref<HTMLElement | null>(null)
const switchWidth = ref<number>(0)
const padding = '1px'

let transition: string | null = null

const hasDefaultSlotContent = computed<boolean>(
  () => slots.default != null && slots.default().length > 0,
)

const hasDescriptionSlotContent = computed<boolean>(
  () => slots.description != null && slots.description().length > 0,
)

const isChecked = computed<boolean>({
  get() {
    if (Array.isArray(selectedValue.value)) {
      return selectedValue.value.map(
        (v) => JSON.stringify(v),
      ).includes(JSON.stringify(value))
    }

    return JSON.stringify(value) === JSON.stringify(selectedValue.value)
  },
  set(checked: unknown) {
    if (isReadonly)
      return

    if (Array.isArray(selectedValue.value)) {
      const index = selectedValue.value.findIndex(
        (entry) => JSON.stringify(entry) === JSON.stringify(value),
      )

      if (index === -1)
        selectedValue.value.push(value)
      else
        selectedValue.value.splice(index, 1)
    }
    else {
      selectedValue.value = checked
    }
  },
})

const computedAccentColor = computed<string>(() => {
  if (accentColor == null)
    return colors['accent-primary']

  return getColor(accentColor)
})

const computedBackgroundColor = computed<string>(() => {
  if (isChecked.value) {
    if (hasError)
      return colors['accent-danger']

    return computedAccentColor.value
  }

  if (backgroundColor == null)
    return colors['bg-switch']

  return getColor(backgroundColor)
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

const computedCheckmarkColor = computed<string>(() => {
  if (checkmarkColor == null)
    return colors['accent-primary-inverted']

  return getColor(checkmarkColor)
})

const thumbStyle = computed<{
  transition: string
  transform: string
}>(() => ({
  transition: transition ?? '',
  transform: isChecked.value
    ? `translateX(calc(${switchWidth.value}px - 100% - calc(${padding} * 2)))`
    : '',
}))

const toggle = (): void => {
  isChecked.value = !isChecked.value
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
    toggle()
    event.preventDefault()
  }
}

onMounted(async () => {
  switchWidth.value = switchEl.value!.clientWidth ?? 0

  // Delay setting the transition to make sure if the initial
  // state is checked, it does not transition
  await nextTick()

  transition = '0.3s cubic-bezier(0.22, 0.68, 0, 1.1)'
})
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
      ref="switchEl"
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
        padding,
        backgroundColor: computedBackgroundColor,
        borderColor: computedBorderColor,
        outlineColor: computedBorderColor,
      }"
      role="switch"
      type="button"
      class="box-content min-w-[2em] rounded-2xl border border-solid border-transparent outline-offset-[3px] duration-200"
      @blur="onBlur"
      @click="toggle"
      @focus="onFocus"
      @keydown="onKeyDown"
    >
      <Transition
        enter-active-class="duration-200"
        enter-from-class="scale-50 opacity-0"
        leave-active-class="duration-200"
        leave-to-class="scale-50 opacity-0"
      >
        <div
          :style="thumbStyle"
          class="h-[1.2em] w-[1.2em] rounded-full bg-white shadow"
        />
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
