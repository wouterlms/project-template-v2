<script setup lang="ts">
import { useTitle } from '@wouterlms/composables'

import {
  usePageTitle,
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

const value = ref(null)
</script>

<template>
  <div class="h-screen" />
  <div class="p-24">
    <div>
      <FormSelect
        v-model="value"
        class="w-52"
      >
        <template #value="{ value }">
          {{ value }}
        </template>

        <FormSelectOption
          v-for="i of 10"
          :key="i"
          :value="i"
        >
          Value {{ i }}
        </FormSelectOption>
      </FormSelect>
    </div>

    <div class="mt-8">
      <FormInput
        :model-value="null"
        class="w-52"
      />
    </div>
  </div>
  <div class="h-screen" />
  <!--
    <AppPageLoader />
    <RouterView />
    <AppToasts />
  -->
</template>
