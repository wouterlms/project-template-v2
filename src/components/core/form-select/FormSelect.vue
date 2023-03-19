<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
} from '@headlessui/vue'

import { useVModel } from '@wouterlms/composables'
import { ARROWS_CHEVRON_DOWN } from '@wouterlms/icons'
import { Float } from '@headlessui-float/vue'

import { colors } from '@/theme'
import { useIsKeyboardMode } from '@/composables/ui'

interface Props {
  modelValue: any
  errors?: { _errors: string[] }
  isDisabled?: boolean
  backgroundColor?: string
  rounded?: 'rounded-none' | 'rounded-sm' | 'rounded' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' | 'rounded-full'
}

const {
  modelValue,
  errors,
  isDisabled = false,
  rounded = 'rounded-md',
} = defineProps<Props>()

const selectedValue = useVModel(computed(() => modelValue))

const isTouched = ref(false)
const isFocused = ref(false)

const isKeyboardMode = useIsKeyboardMode()

const hasError = computed(() => errors != null && errors._errors.length > 0 && isTouched.value)

const isMuliple = computed(() => Array.isArray(modelValue))

provide('isMultiple', isMuliple.value)

const computedIconColor = computed<string>(() => {
  if (hasError.value)
    return colors.value.accent.danger[500]

  return colors.value.text.tertiary
})

const computedColor = computed<string>(() => {
  if (isDisabled)
    return colors.value.text.inputDisabled

  if (hasError.value)
    return colors.value.accent.danger[500]

  return colors.value.text.input
})

const computedBorderColor = (isOpen: boolean): string => {
  if (hasError.value)
    return colors.value.accent.danger[500]

  if (isFocused.value || isOpen)
    return colors.value.accent.primary

  return colors.value.border.input
}

const computedBackgroundColor = computed<string>(() => {
  if (isDisabled === true)
    return colors.value.background.inputDisabled

  return colors.value.background.input
})

const computedOutlineColor = (isOpen: boolean): string => {
  if ((isFocused.value || isOpen) && isKeyboardMode.value)
    return computedBorderColor(true)

  return 'transparent'
}

const handleFocus = (): void => {
  isFocused.value = true
}

const handleBlur = (isOpen: boolean): void => {
  isFocused.value = false

  if (!isOpen)
    isTouched.value = true
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Listbox
    v-slot="{ open }"
    v-model="selectedValue"
    :multiple="isMuliple"
  >
    <Float
      :flip="true"
      :adaptive-width="true"
      enter="transition duration-150"
      enter-from="scale-y-[0.85] opacity-0"
      enter-to="scale-100 opacity-100"
      leave="transition duration-150"
      leave-from="scale-100 opacity-100"
      leave-to="scale-y-[0.95] opacity-0"
      tailwindcss-origin-class
    >
      <ListboxButton
        v-bind="$attrs"
        :class="rounded"
        :style="{
          backgroundColor: computedBackgroundColor,
          color: computedColor,
          borderColor: computedBorderColor(open),
          outlineColor: computedOutlineColor(open),
        }"
        class="bg-input flex h-10 items-center justify-between border border-solid p-2 text-left outline outline-2 outline-offset-2"
        @focus="handleFocus"
        @blur="handleBlur(open)"
      >
        <span>
          <slot
            v-if="selectedValue != null"
            name="value"
            :value="selectedValue"
          />
        </span>

        <AppIcon
          :icon="ARROWS_CHEVRON_DOWN"
          :style="{
            color: computedIconColor,
          }"
          class="h-3 w-3"
        />
      </ListboxButton>

      <ListboxOptions class="bg-primary shadow-primary max-h-60 overflow-hidden overflow-y-auto rounded-md outline-none">
        <slot />
      </ListboxOptions>
    </Float>
  </Listbox>
</template>
