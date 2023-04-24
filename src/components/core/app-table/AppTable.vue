<script setup lang="ts">
interface Props {
  /**
   * The Tailwind CSS grid class to use for the grid.
   * Example: 'grid-cols-2'
   */
  gridClass: string
}

const { gridClass } = defineProps<Props>()

provide('grid', computed<string>(() => gridClass))
</script>

<template>
  <slot />
</template>
