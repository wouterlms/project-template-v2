<script setup lang="ts">
import type { Color } from '@/theme'

interface Props {
  /**
   * Icon
   */
  icon: string

  /**
   * Retains inline colors
   */
  preserveOriginalColor?: boolean

  /**
   * Secondary color
   */
  secondaryColor?: Color | string
}

const {
  icon,
  preserveOriginalColor = false,
  secondaryColor,
} = defineProps<Props>()

const removeHexColors = (path: string): string => {
  let pathWithoutHexCodes = path

  const hexColors = path.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g) ?? []

  hexColors.forEach((hex) => {
    pathWithoutHexCodes = pathWithoutHexCodes.replace(hex, 'currentColor')
  })

  return pathWithoutHexCodes
}

const viewBox = computed<Nullable<string>>(() => {
  const wrapper = document.createElement('div')

  wrapper.innerHTML = icon

  const viewbox = wrapper.querySelector('svg')?.getAttribute('viewBox') ?? ''

  return viewbox
})

const paths = computed<string>(() => {
  const wrapper = document.createElement('div')

  wrapper.innerHTML = icon

  const svgContent = Array.from(wrapper.children)
    .map((c) => c.innerHTML)
    .join('')

  if (preserveOriginalColor)
    return svgContent

  let pathWithoutHexColors = removeHexColors(svgContent)

  pathWithoutHexColors = pathWithoutHexColors
    .replaceAll('black', 'currentColor')
    .replaceAll('white', secondaryColor ?? 'transparent')

  return pathWithoutHexColors
})
</script>

<template>
  <svg
    :viewBox="viewBox ?? undefined"
    class="fill-current"
    height="100%"
    preserveAspectRatio="xMinYMin meet"
    width="100%"
    v-html="paths"
  />
</template>
