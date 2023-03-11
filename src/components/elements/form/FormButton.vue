<script setup lang="ts">
import type { UseForm } from '@appwise/forms'

interface Props {
  form: UseForm<any>
  disableIfNotDirty?: boolean
  isDisabled?: boolean
}

const {
  form,
  disableIfNotDirty = true,
  isDisabled = false,
} = defineProps<Props>()
</script>

<template>
  <ButtonPrimary
    :is-disabled="(!form.isDirty && disableIfNotDirty) || isDisabled"
    :is-loading="form.isSubmitting"
    type="submit"
  >
    <slot />
  </ButtonPrimary>
</template>
