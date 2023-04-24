<script setup lang="ts">
import type { UseForm } from '@appwise/forms'

interface Props {
  form: UseForm<any>
}

const { form } = defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <form
    class="flex h-full w-full flex-1 flex-col"
    novalidate
    @submit.prevent="form.submit"
  >
    <slot v-if="form.isReady" />

    <CenterContent v-else>
      <AppLoader>
        {{ t('layout.loading_form') }}
      </AppLoader>
    </CenterContent>
  </form>
</template>
