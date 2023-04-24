<script setup lang="ts">
import { useComponentAttrs } from '@/composables/ui'
import { colors, getColor } from '@/theme'

export interface Props {
  /**
   * The value of the component. Can be either a number or a string.
   */
  modelValue: Nullable<number | string>

  /**
   * Determines if the component is readonly or not.
   */
  isReadonly?: boolean

  /**
   * Determines if the component is disabled or not.
   */
  isDisabled?: boolean

  /**
   * Determines if the component is in a loading state or not.
   */
  isLoading?: boolean

  /**
   * Determines if the component should check for spelling errors or not.
   */
  spellcheck?: boolean

  /**
   * The type of input for the component. Can be one of:
   * 'date', 'email', 'number', 'password', 'text', 'textarea', 'time'
   * Defaults to 'text'.
   */
  type?: 'date' | 'email' | 'number' | 'password' | 'text' | 'textarea' | 'time'

  /**
   * The border color of the component.
   * This can be a theme color or a hex color.
   * Defaults to 'border-input'.
   */
  borderColor?: string

  /**
   * The size of the icon.
   * This can be any valid CSS size value, such as px, em, or %.
   * Defaults to 0.975em.
   */
  iconSize?: string

  /**
   * The padding of the component.
   * This can be any valid CSS padding value, such as px, em, or %.
   * Defaults to 0.5em.
   */
  padding?: string

  /**
   * The border radius of the button.
   * Defaults to 'rounded-md'.
   */
  rounded?: 'rounded-2xl' | 'rounded-3xl' | 'rounded-full' | 'rounded-lg' | 'rounded-md' | 'rounded-none' | 'rounded-sm' | 'rounded-xl' | 'rounded'

  /**
   * Determines if the component has an error or not.
   * If set to true, the component will display an error state, such as a red border.
   * If not specified or set to false, the component will display its default state.
   */
  hasError?: boolean
}

const {
  borderColor,
  hasError = false,
  iconSize = '0.975em',
  isDisabled = false,
  isLoading = false,
  isReadonly = false,
  modelValue,
  padding = '0.5em',
  rounded = 'rounded-md',
  spellcheck = false,
  type = 'text',
} = defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Nullable<number | string>): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
}>()

const value = computed<Nullable<number | string>>({
  get: () => modelValue,
  set: (value) => {
    if (type === 'number') {
      const valueAsNumber = Number(value)

      emit('update:modelValue', Number.isNaN(valueAsNumber) ? null : valueAsNumber)
    }
    else {
      emit('update:modelValue', value)
    }
  },
})

const isPasswordVisible = ref<boolean>(false)
const isFocused = ref<boolean>(false)

const attrs = useComponentAttrs()
const slots = useSlots()

const hasLeftIconSlotContent = computed<boolean>(
  () => slots['icon-left'] != null && slots['icon-left']().length > 0,
)
const hasRightIconSlotContent = computed<boolean>(
  () => slots['icon-right'] != null && slots['icon-right']().length > 0,
)

const componentType = computed<'input' | 'textarea'>(() => {
  if (type === 'textarea')
    return 'textarea'

  return 'input'
})

const inputType = computed<string>(() => {
  if (type === 'password')
    return isPasswordVisible.value ? 'text' : 'password'

  return type
})

const computedIconColor = computed<string>(() => {
  if (hasError)
    return colors['accent-danger']

  return colors['text-tertiary']
})

const computedTextColor = computed<string>(() => {
  if (hasError)
    return colors['accent-danger']

  if (isDisabled)
    return colors['text-input-disabled']

  return colors['text-input']
})

const computedBorderColor = computed<string>(() => {
  if (hasError)
    return colors['accent-danger']

  if (isFocused.value)
    return colors['accent-primary']

  if (borderColor == null)
    return colors['border-input']

  return getColor(borderColor)
})

const computedOutlineColor = computed<string>(() => {
  if (isFocused.value)
    return computedBorderColor.value

  return 'transparent'
})

const computedBackgroundColor = computed<string>(() => {
  if (isDisabled)
    return colors['bg-input-disabled']

  return colors['bg-input']
})

const togglePasswordVisibility = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const onFocus = (e: FocusEvent): void => {
  isFocused.value = true
  emit('focus', e)
}

const onBlur = (e: FocusEvent): void => {
  isFocused.value = false
  emit('blur', e)
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
    :class="rounded"
    :style="{
      borderColor: computedBorderColor,
      color: computedTextColor,
      outlineColor: computedOutlineColor,
      backgroundColor: computedBackgroundColor,
    }"
    class="flex items-center border border-solid outline outline-2 outline-offset-2 duration-200"
  >
    <div
      v-if="hasLeftIconSlotContent"
      :style="{
        marginLeft: padding,
        width: iconSize,
        height: iconSize,
        color: computedIconColor,
      }"
      class="shrink-0"
    >
      <slot name="icon-left" />
    </div>

    <Component
      v-bind="{
        ...attrs.listeners,
        ...attrs.functional,
      }"
      :is="componentType"
      :value="value"
      :class="[
        {
          'cursor-not-allowed': isDisabled,
          'cursor-default': isReadonly,
        },
      ]"
      :disabled="isDisabled"
      :readonly="isReadonly"
      :spellcheck="spellcheck"
      :style="{
        padding,
      }"
      :type="inputType"
      class="w-full border-none bg-transparent outline-none"
      @blur="onBlur"
      @focus="onFocus"
      @input="value = $event.target.value"
    />

    <AppLoader
      v-if="isLoading"
      :accent-color="computedIconColor"
      class="mr-[1em] text-xs"
    />

    <div
      v-else-if="hasRightIconSlotContent"
      :style="{
        width: iconSize,
        height: iconSize,
        marginRight: padding,
        color: computedIconColor,
      }"
      class="shrink-0"
    >
      <slot name="icon-right" />
    </div>

    <AppButton
      v-else-if="type === 'password'"
      :accent-color="computedIconColor"
      :is-disabled="isDisabled"
      :style="{
        marginRight: padding,
      }"
      padding="0.2em"
      rounded="rounded-sm"
      variant="ghost"
      @click="togglePasswordVisibility"
    >
      <template #icon-left>
        <EyeSlashIcon v-if="isPasswordVisible" />
        <EyeIcon v-else />
      </template>
    </AppButton>
  </label>
</template>
