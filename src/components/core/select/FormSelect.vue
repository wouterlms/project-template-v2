<script setup lang="ts">
import { useVModel } from '@wouterlms/composables'

import { useComponentAttrs } from '@/composables/ui'

import type { Props as BaseInputProps } from './BaseSelect.vue'

interface Props extends BaseInputProps {
  /**
   * The current value of the input.
   */
  modelValue: BaseInputProps['modelValue']

  /**
   * A function that converts the input value to a string for display.
   * @param value The value of the input.
   * @returns A string representation of the value.
   */
  displayValue: (value: unknown) => string

  /**
   * The error messages associated with the component, if any.
   * It should be an object with an "_errors" property containing an array of strings.
   */
  errors: { _errors: string[] } | undefined

  /**
   * The label to be displayed above the component.
   */
  label: string

  /**
   * Determines if the component has emitted a `blur` event.
   */
  isTouched: boolean
}

const {
  errors,
  isTouched,
  label,
  modelValue,
} = defineProps<Props>()

const value = useVModel(computed<BaseInputProps['modelValue']>(() => modelValue))

const attrs = useComponentAttrs()

const hasError = computed<boolean>(() => errors != null && errors._errors.length > 0 && isTouched)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <FormLabel
    v-bind="attrs.styling"
    :errors="errors"
    :is-touched="isTouched"
    :label="label"
  >
    <BaseSelect
      v-model="value"
      v-bind="{
        ...attrs.functional,
        ...attrs.listeners,
      }"
      :display-value="displayValue"
      :has-error="hasError"
    >
      <template #icon-left>
        <slot name="icon-left" />
      </template>

      <slot />
    </BaseSelect>
  </FormLabel>
</template>
