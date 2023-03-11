<script setup lang="ts">
import AppContainer from '@/components/layout/page/AppContainer.vue'

interface Props {
  hasMaxWidth?: boolean
}

const { hasMaxWidth = true } = defineProps<Props>()
</script>

<template>
  <Component
    :is="hasMaxWidth ? AppContainer : 'div'"
    class="flex h-full flex-1 flex-col pb-4"
  >
    <slot />
  </Component>
</template>
