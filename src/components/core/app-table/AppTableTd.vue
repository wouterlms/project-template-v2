<script setup lang="ts">
interface Props {
  shouldTruncate?: boolean
}

withDefaults(defineProps<Props>(), {
  shouldTruncate: true,
})
</script>

<template>
  <div
    :class="{
      truncate: shouldTruncate,
    }"
    class="text-sm leading-5"
  >
    <slot />
  </div>
</template>
