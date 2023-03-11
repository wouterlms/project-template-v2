<script setup lang="ts">
import { RouterLink as RouterLinkComponent } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'

interface Props {
  to: RouteLocationMatched
}

const { to } = defineProps<Props>()
</script>

<template>
  <RouterLinkComponent
    v-slot="slotProps"
    :to="to"
    class="outline-inherit"
  >
    <slot v-bind="slotProps" />
  </RouterLinkComponent>
</template>
