<script setup lang="ts">
interface Props {
  grid: string
}

const { grid } = defineProps<Props>()

provide('grid', computed<string>(() => grid))
</script>

<template>
  <slot />
</template>
