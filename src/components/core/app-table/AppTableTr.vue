<script setup lang="ts">
import type { ComputedRef } from 'vue'

interface Props {
  as?: string
}

const {
  as = 'div',
} = defineProps<Props>()

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
