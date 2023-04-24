<script setup lang="ts">
import { ARROWS_CHEVRON_RIGHT } from '@wouterlms/icons'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  to?: RouteLocationRaw
}

const { to } = defineProps<Props>()
</script>

<template>
  <Component
    :is="!!to ? 'RouterLink' : 'div'"
    :class="[!!to ? 'text-secondary hover:underline' : 'text-tertiary']"
    :to="to"
    class="max-w-[12rem] truncate text-sm"
  >
    <slot />
  </Component>

  <AppIcon
    v-if="to"
    :icon="ARROWS_CHEVRON_RIGHT"
    class="text-tertiary mx-3 h-auto w-2.5"
  />
</template>
