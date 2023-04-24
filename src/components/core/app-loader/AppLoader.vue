<script setup lang="ts">
import { colors, getColor } from '@/theme'

interface Props {
  accentColor?: string
}

const { accentColor } = defineProps<Props>()

const computedAccentColor = computed<string>(() => {
  if (accentColor == null)
    return colors['text-primary']

  return getColor(accentColor)
})

const rgbToRgba = (rgb: string, alpha: number): string => {
  const [
    , r, g, b,
  ] = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/) ?? []

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- eslint-disable tailwindcss/no-custom-classname -->
    <div
      :style="{
        borderColor: rgbToRgba(computedAccentColor, 0.5),
        borderRightColor: computedAccentColor,
        borderTopColor: computedAccentColor,
      }"
      class="spin h-[1em] w-[1em] rounded-full border border-solid text-center"
    />
    <!-- eslint-enable tailwindcss/no-custom-classname -->

    <div
      v-if="$slots.default"
      class="text-secondary mt-1 text-xs"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.spin {
  animation: spin 600ms infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
