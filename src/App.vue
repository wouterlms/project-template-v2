<script setup lang="ts">
import { useTitle } from '@wouterlms/composables'

import {
  usePageTitle,
  useRouterUtils,
  useServerErrorInterceptor,
} from '@/composables'

const { setTemplate } = useTitle()

const {
  initialiseMiddlewares,
  initialiseStoreResets,
} = useRouterUtils()

useServerErrorInterceptor()
usePageTitle()

initialiseMiddlewares()
initialiseStoreResets()

setTemplate('{title} | App')
</script>

<template>
  <AppPageLoader />
  <RouterView />
  <AppToasts />
</template>
