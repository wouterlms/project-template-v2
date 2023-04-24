<script setup lang="ts">
import { useVModel } from '@wouterlms/composables'

import { useComponentAttrs } from '@/composables/ui'

import type { Props as BaseInputProps } from './BaseInput.vue'

interface Props extends BaseInputProps {
  /**
   * The value of the component. Can be either a number or a string.
   */
  modelValue: BaseInputProps['modelValue']

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
    <BaseInput
      v-model="value"
      v-bind="{
        ...attrs.functional,
        ...attrs.listeners,
      }"
      :has-error="hasError"
    />
  </FormLabel>
</template>
