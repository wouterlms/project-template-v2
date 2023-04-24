<script setup lang="ts">
import type { UseForm } from '@appwise/forms'

interface Props {
  form: UseForm<any>
  disableIfNotDirty?: boolean
  isDisabled?: boolean
}

const {
  disableIfNotDirty = true,
  form,
  isDisabled = false,
} = defineProps<Props>()

const isButtonDisabled = computed<boolean>(() => {
  if (isDisabled)
    return true

  if (disableIfNotDirty)
    return !form.isDirty

  return false
})
</script>

<template>
  <ButtonPrimary
    :is-disabled="isButtonDisabled"
    :is-loading="form.isSubmitting"
    type="submit"
  >
    <slot />
  </ButtonPrimary>
</template>
