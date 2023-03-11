<script setup lang="ts">
import type { ComputedRef } from 'vue'

interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'div',
})

const grid = inject('grid') as ComputedRef<string>
</script>

<template>
  <Component
    :is="as"
    :class="grid"
    class="grid shrink-0 items-center gap-4"
  >
    <slot />
  </Component>
</template>
