<script setup lang="ts">
import { colors } from '@/theme'
</script>

<template>
  <AppButton
    :border-color="colors.neutral[300]"
    variant="outline"
    padding="0.7em 0.9em"
    class="text-xs"
  >
    <slot />
  </AppButton>
</template>
