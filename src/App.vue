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

const varr = ref([])
const filter = ref('')

const options = [
  'Jjohn',
  'Jjane',
  'Jjoe',
  'Johnatha',
  'Johnathan',
]

const filteredOptions = computed(() => {
  if (!filter.value)
    return options

  return options.filter((option) => option.toLowerCase().includes(filter.value.toLowerCase()))
})
</script>

<template>
  <div class="p-24">
    <BaseSelect
      v-model="varr"
      :display-value="(v) => v"
      :is-filterable="true"
      @update:filter="filter = $event"
    >
      <FormSelectOptionOld
        v-for="option of filteredOptions"
        :key="option"
        :value="option"
      >
        {{ option }}
      </FormSelectOptionOld>
    </BaseSelect>
  </div>

  <AppPageLoader />
  <RouterView />
  <AppToasts />
</template>
