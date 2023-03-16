<script setup lang="ts">
interface Props {
  message: Nullable<string>
  status: number
}

const { message, status } = defineProps<Props>()

const { t } = useI18n()

const httpErrorMap = new Map<string, string>(Object.entries({
  400: t('suspense.bad_request'),
  401: t('suspense.unauthorized'),
  403: t('suspense.forbidden'),
  404: t('suspense.not_found'),
  500: t('suspense.server_error'),
}))

console.error(message)
</script>

<template>
  <div class="flex items-center p-4 text-sm">
    <div class="border-primary text-tertiary/75 border-r border-solid px-4 tracking-wider">
      {{ status }}
    </div>

    <div class="text-tertiary/75 px-4 uppercase tracking-wider">
      {{ httpErrorMap.get(`${status}`) ?? t('suspense.something_went_wrong') }}
    </div>
  </div>
</template>
