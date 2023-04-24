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
import { ARROWS_CHEVRON_DOWN } from '@wouterlms/icons'

import { useIsKeyboardMode } from '@/composables/ui'
import { colors } from '@/theme'

import FormLabel from '../form-label/FormLabel.vue'

type ModelValue = boolean
| number
| object
| string
| null

interface Props {
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
   * Any errors associated with the input.
   */
  errors?: {
    _errors: string[]
  }

  /**
   * Whether the input should be filterable / searchable.
   */
  isFilterable?: boolean

  /**
   * Whether the input is currently disabled.
   */
  isDisabled?: boolean

  /**
   * Whether the input has been "touched" (e.g. clicked or focused).
   */
  isTouched?: boolean

  /**
   * The border radius of the input element.
   * Valid options: 'rounded-2xl', 'rounded-3xl', 'rounded-full', 'rounded-lg', 'rounded-md',
   * 'rounded-none', 'rounded-sm', 'rounded-xl', 'rounded'.
   * Defaults to 'rounded-md'.
   */
  rounded?: 'rounded-2xl' | 'rounded-3xl' | 'rounded-full' | 'rounded-lg' | 'rounded-md' | 'rounded-none' | 'rounded-sm' | 'rounded-xl' | 'rounded'

  /**
   * The label of the input.
   */
  label?: string
}

const {
  errors,
  isDisabled = false,
  isFilterable = false,
  isTouched = false,
  modelValue,
  rounded = 'rounded-md',
} = defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ModelValue): void
  (event: 'update:filter', value: string): void
  (event: 'blur'): void
  (event: 'scroll:bottom'): void
}>()

const selectedValue = useVModel(computed<ModelValue>(() => modelValue))

const isFocused = ref<boolean>(false)
const hasBeenFocusedAtleastOnce = ref<boolean>(false)
const optionsElement = ref<Nullable<InstanceType<typeof ComboboxOptions | typeof ListboxOptions>>>(
  null,
)

const { t } = useI18n()
const isKeyboardMode = useIsKeyboardMode()

const hasError = computed<boolean>(() => errors != null && errors._errors.length > 0 && isTouched)
const isMultiple = computed<boolean>(() => Array.isArray(modelValue))
const hasValue = computed<boolean>(
  () => isMultiple.value ? (modelValue as unknown[]).length > 0 : modelValue != null,
)

provide('isMultiple', isMultiple.value)
provide('isFilterable', isFilterable)

const inputClasses = 'bg-input relative flex h-10 items-center justify-between border border-solid p-2 text-left outline outline-2 outline-offset-2'
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

const computedIconColor = computed<string>(() => {
  if (hasError.value)
    return colors['accent-danger']

  return colors['text-tertiary']
})

const computedColor = computed<string>(() => {
  if (isDisabled)
    return colors['text-input-disabled']

  if (hasError.value)
    return colors['accent-danger']

  return colors['text-input']
})

const computedBorderColor = (isOpen: boolean): string => {
  if (hasError.value)
    return colors['accent-danger']

  if (isFocused.value || isOpen)
    return colors['accent-primary']

  return colors['border-input']
}

const computedBackgroundColor = computed<string>(() => {
  if (isDisabled)
    return colors['bg-input-disabled']

  return colors['bg-input']
})

// const computedInnerShadow = computed<string>(() => {
//   const shadows: string[] = []

//   if (!isScrolledToTop.value)
//     shadows.push('inset 0px 20px 20px -20px rgba(0, 0, 0, 0.1)')

//   if (!isScrolledToBottom.value)
//     shadows.push('inset 0px -20px 20px -20px rgba(0, 0, 0, 0.1)')

//   return shadows.join(',')
// })

const computedOutlineColor = (isOpen: boolean): string => {
  if ((isFocused.value || isOpen) && isKeyboardMode.value)
    return computedBorderColor(true)

  return 'transparent'
}

const handleFocus = (): void => {
  isFocused.value = true
  hasBeenFocusedAtleastOnce.value = true
}

const handleBlur = (isOpen: boolean): void => {
  isFocused.value = false

  if (!isOpen)
    emit('blur')
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
</script>

<template>
  <FormLabel
    :errors="errors"
    :is-touched="isTouched"
    :label="label"
    class="block"
  >
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
          backgroundColor: computedBackgroundColor,
          borderColor: computedBorderColor(open),
          outlineColor: computedOutlineColor(open),
        }"
        class="duration-200"
      >
        <ComboboxInput
          :display-value="hasValue && !open ? displayValue : undefined"
          :placeholder="hasValue && open ? displayValue(modelValue) : undefined"
          :spellcheck="false"
          :style="{
            color: computedColor,
          }"
          class="block w-full truncate bg-transparent pr-4 outline-none"
          @blur="handleBlur(open)"
          @change="emit('update:filter', $event.target.value)"
          @focus="handleFocus"
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
            <AppIcon
              :icon="ARROWS_CHEVRON_DOWN"
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
            <slot>
              <slot name="empty">
                <AppText
                  class="px-5 py-3"
                  variant="body-1"
                >
                  {{ t('core.no_results_found') }}
                </AppText>
              </slot>
            </slot>
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
            backgroundColor: computedBackgroundColor,
            color: computedColor,
            borderColor: computedBorderColor(open),
            outlineColor: computedOutlineColor(open),
          }"
          class="block w-full"
          @blur="handleBlur(open)"
          @focus="handleFocus"
        >
          <span class="truncate">
            <template v-if="selectedValue != null">
              {{ displayValue(selectedValue) }}
            </template>
          </span>

          <AppIcon
            :icon="ARROWS_CHEVRON_DOWN"
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
          <slot>
            <slot name="empty">
              <AppText
                class="px-5 py-3"
                variant="body-1"
              >
                {{ t('core.no_results_found') }}
              </AppText>
            </slot>
          </slot>
        </ListboxOptions>
      </Float>
    </Listbox>
  </FormLabel>
</template>
