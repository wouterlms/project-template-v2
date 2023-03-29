<script setup lang="ts">
interface Props {
  truncate?: boolean
}

const { truncate = false } = defineProps<Props>()
</script>

<template>
  <div
    :class="{
      truncate,
    }"
    class="text-sm leading-5"
  >
    <slot />
  </div>
</template>
