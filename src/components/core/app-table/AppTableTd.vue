<script setup lang="ts">
interface Props {
  /**
   * Whether or not the content should be truncated.
   */
  shouldNotTruncate?: boolean
}

const { shouldNotTruncate = false } = defineProps<Props>()
</script>

<template>
  <div
    :class="{
      truncate: !shouldNotTruncate,
    }"
    class="text-sm leading-5"
  >
    <slot />
  </div>
</template>
