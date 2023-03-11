<script setup lang="ts">
import type { ComputedRef } from 'vue'

interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'div',
})

const grid = inject('grid') as ComputedRef<string>
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
