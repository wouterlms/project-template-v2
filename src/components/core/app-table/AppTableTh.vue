<script setup lang="ts">
interface Props {
  /**
   * The HTML element or Vue component to use for rendering the component.
   * If this prop is not provided, 'div' will be used.
   * Example: 'div', 'button', or a Vue component name.
   */
  as?: string
}

const {
  as = 'div',
} = defineProps<Props>()

const grid = inject('grid')
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
