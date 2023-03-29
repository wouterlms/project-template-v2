<script setup lang="ts">
import { useTitle } from '@wouterlms/composables'

import { z } from 'zod'
import {
  usePageTitle,
  usePagination,
  useRouterUtils,
  useServerErrorInterceptor,
} from '@/composables'

const { setTemplate } = useTitle()
const { initialiseMiddlewares, initialiseStoreResets } = useRouterUtils()

useServerErrorInterceptor()
usePageTitle()

initialiseMiddlewares()
initialiseStoreResets()

setTemplate('{title} | App')

const value = ref<boolean>(false)

const user = z.object({
  id: z.string(),
  name: z.string(),
})

const usersPaginator = usePagination('/business-pages', user, {
  name: 'test',
})

setTimeout(async () => {
  await usersPaginator.next()

  console.log(usersPaginator.data[0])
}, 1000)
</script>

<template>
  <div class="p-24">
    <FormRadio
      v-model="value"
      :value="true"
      accent-color="text-tertiary"
    >
      Checkbox
    </FormRadio>
  </div>

  <AppPageLoader />
  <RouterView />
  <AppToasts />
</template>
