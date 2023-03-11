<script setup lang="ts">
interface Props {
  direction?: 'horizontal' | 'vertical'
  spacing?: number
}

const {
  direction = 'vertical',
  spacing = 4,
} = defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'flex-col': direction === 'vertical',
    }"
    :style="{
      gap: `${spacing / 4}rem`,
    }"
    class="flex"
  >
    <slot />
  </div>
</template>
