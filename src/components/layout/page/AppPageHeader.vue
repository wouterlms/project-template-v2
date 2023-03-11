<script setup lang="ts">
import type { Breadcrumb } from '@/models'

interface Props {
  title: string
  breadcrumbs?: Breadcrumb[]
}

const { breadcrumbs = [] } = defineProps<Props>()
</script>

<template>
  <header class="mb-10">
    <AppContainer class="flex items-center justify-between pt-12">
      <div>
        <AppBreadcrumbs
          v-if="breadcrumbs.length > 0"
          class="mb-1"
        >
          <AppBreadcrumbItem
            v-for="{ to, label } of breadcrumbs"
            :key="label"
            :to="to"
          >
            {{ label }}
          </AppBreadcrumbItem>
        </AppBreadcrumbs>

        <div class="flex items-center">
          <AppText
            variant="display-3"
            class="font-medium"
          >
            {{ title }}
          </AppText>

          <slot name="title" />
        </div>
      </div>

      <slot name="right" />
    </AppContainer>
  </header>
</template>
