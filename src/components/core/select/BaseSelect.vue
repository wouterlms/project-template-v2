<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  Listbox,
  ListboxButton,
  ListboxOptions,
} from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'
import { useVModel } from '@wouterlms/composables'

import { colors, getColor } from '@/theme'

type ModelValue = boolean | number | object | string | null

export interface Props {
  /**
   * The current value of the input.
   */
  modelValue: ModelValue

  /**
   * A function that converts the input value to a string for display.
   * @param value The value of the input.
   * @returns A string representation of the value.
   */
  displayValue: (value: unknown) => string

  /**
   * Whether the input should be filterable / searchable.
   */
  isFilterable?: boolean

  /**
   * Whether the input is currently disabled.
   */
  isDisabled?: boolean

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
   * The border radius of the input element.
   * Valid options: 'rounded-2xl', 'rounded-3xl', 'rounded-full', 'rounded-lg', 'rounded-md',
   * 'rounded-none', 'rounded-sm', 'rounded-xl', 'rounded'.
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
  modelValue,
  isDisabled = false,
  hasError = false,
  isFilterable = false,
  rounded = 'rounded-md',
  iconSize = '0.975em',
  padding = '0.5em',
} = defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ModelValue): void
  (event: 'update:filter', value: string): void
  (event: 'focus'): void
  (event: 'blur'): void
  (event: 'scroll:bottom'): void
}>()

const selectedValue = useVModel(computed<ModelValue>(() => modelValue))

const slots = useSlots()

const isFocused = ref<boolean>(false)
const hasBeenFocusedAtleastOnce = ref<boolean>(false)

const optionsElement = ref<Nullable<InstanceType<typeof ComboboxOptions | typeof ListboxOptions>>>(
  null,
)

const inputClasses = 'bg-input relative flex h-10 items-center justify-between border border-solid text-left outline outline-2 outline-offset-2'
const optionsClasses = 'relative bg-primary shadow-primary max-h-60 overflow-hidden overflow-y-auto rounded-md outline-none'

const floatProps = {
  'flip': true,
  'adaptive-width': true,
  'auto-update': {
    animationFrame: true,
  },
  'enter': 'transition duration-150',
  'enter-from': 'scale-y-[0.85] opacity-0',
  'enter-to': 'scale-100 opacity-100',
  'leave': 'transition duration-150',
  'leave-from': 'scale-100 opacity-100',
  'leave-to': 'scale-y-[0.95] opacity-0',
  'tailwindcss-origin-class': true,
}

const hasLeftIconSlotContent = computed<boolean>(
  () => slots['icon-left'] != null && slots['icon-left']().length > 0,
)

const isMultiple = computed<boolean>(() => Array.isArray(modelValue))

const hasValue = computed<boolean>(
  () => isMultiple.value ? (modelValue as unknown[]).length > 0 : modelValue != null,
)

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

const computedBorderColor = (isOpen: boolean): string => {
  if (hasError)
    return colors['accent-danger']

  if (isFocused.value || isOpen)
    return colors['accent-primary']

  if (borderColor == null)
    return colors['border-input']

  return getColor(borderColor)
}

const computedOutlineColor = (isOpen: boolean): string => {
  if (isFocused.value || isOpen)
    return computedBorderColor(true)

  return 'transparent'
}

const computedBackgroundColor = computed<string>(() => {
  if (isDisabled)
    return colors['bg-input-disabled']

  return colors['bg-input']
})

const onFocus = (): void => {
  isFocused.value = true
  hasBeenFocusedAtleastOnce.value = true

  emit('focus')
}

const onBlur = (isOpen: boolean): void => {
  isFocused.value = false

  if (!isOpen) {
    emit('update:filter', '')
    emit('blur')
  }
}

const handleScroll = (e: Event): void => {
  const target = e.target as HTMLElement

  const isScrolledToBottom = target.scrollHeight - target.scrollTop === target.clientHeight

  if (isScrolledToBottom)
    emit('scroll:bottom')
}

/**
 * We do not have access to the `open` state in the script,
 * so there is currently no way to determine if the select has lost focus.
 */
watch(() => (optionsElement.value?.$el ?? null) as Nullable<HTMLElement>, (el) => {
  if (el === null && hasBeenFocusedAtleastOnce.value && !isFocused.value)
    emit('blur')
}, { deep: true })

provide('isMultiple', isMultiple.value)
provide('isFilterable', isFilterable)
</script>

<template>
  <Combobox
    v-if="isFilterable"
    v-slot="{ open }"
    v-model="selectedValue"
    :multiple="isMultiple"
    as="template"
  >
    <div
      :class="[inputClasses, rounded]"
      :style="{
        padding,
        backgroundColor: computedBackgroundColor,
        borderColor: computedBorderColor(open),
        outlineColor: computedOutlineColor(open),
      }"
      class="duration-200"
    >
      <div
        v-if="hasLeftIconSlotContent"
        :style="{
          marginRight: padding,
          width: iconSize,
          height: iconSize,
          color: computedIconColor,
        }"
        class="shrink-0"
      >
        <slot name="icon-left" />
      </div>

      <ComboboxInput
        :display-value="hasValue && !open ? displayValue : undefined"
        :placeholder="hasValue && open ? displayValue(modelValue) : undefined"
        :spellcheck="false"
        :style="{
          color: computedTextColor,
        }"
        class="block w-full truncate bg-transparent pr-4 outline-none"
        @blur="onBlur(open)"
        @change="emit('update:filter', $event.target.value)"
        @focus="onFocus"
      />

      <Float
        v-bind="floatProps"
        :offset="{
          mainAxis: 1,
        }"
      >
        <ComboboxButton
          class="absolute left-0 top-0 flex h-full w-full items-center justify-end bg-transparent p-2"
          @click.prevent
        >
          <ChevronDownIcon
            :style="{
              color: computedIconColor,
            }"
            class="h-3 w-3"
          />
        </ComboboxButton>

        <ComboboxOptions
          ref="optionsElement"
          :class="optionsClasses"
          @scroll="handleScroll"
        >
          <slot />
        </ComboboxOptions>
      </Float>
    </div>
  </Combobox>

  <Listbox
    v-else
    v-slot="{ open }"
    v-model="selectedValue"
    :multiple="isMultiple"
    :show="true"
  >
    <Float v-bind="floatProps">
      <ListboxButton
        :class="[inputClasses, rounded]"
        :style="{
          padding,
          backgroundColor: computedBackgroundColor,
          color: computedTextColor,
          borderColor: computedBorderColor(open),
          outlineColor: computedOutlineColor(open),
        }"
        class="block w-full duration-200"
        @blur="onBlur(open)"
        @focus="onFocus"
      >
        <div class="flex items-center">
          <div
            v-if="hasLeftIconSlotContent"
            :style="{
              marginRight: padding,
              width: iconSize,
              height: iconSize,
              color: computedIconColor,
            }"
            class="shrink-0"
          >
            <slot name="icon-left" />
          </div>

          <span class="truncate">
            <template v-if="selectedValue != null">
              {{ displayValue(selectedValue) }}
            </template>
          </span>
        </div>

        <ChevronDownIcon
          :style="{
            color: computedIconColor,
          }"
          class="h-3 w-3 shrink-0"
        />
      </ListboxButton>

      <ListboxOptions
        ref="optionsElement"
        :class="optionsClasses"
        @scroll="handleScroll"
      >
        <slot />
      </ListboxOptions>
    </Float>
  </Listbox>
</template>
