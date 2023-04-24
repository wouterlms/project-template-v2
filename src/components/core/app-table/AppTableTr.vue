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
  <AppContainer
    :as="as"
    class="block"
  >
    <div
      :class="grid"
      class="grid items-center gap-4"
    >
      <slot />
    </div>
  </AppContainer>
</template>
