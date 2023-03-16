<script setup lang="ts">
import type { Props as BaseProps } from './useAppTabs'
import useAppTabs from './useAppTabs'

interface Props extends BaseProps {}

withDefaults(defineProps<Props>(), {})

const { tabs, state } = useAppTabs()
</script>

<template>
  <Component :is="tabs">
    <div class="relative inline-flex">
      <div
        :style="state.style"
        class="h-full rounded bg-neutral-100"
      />

      <slot />
    </div>
  </Component>
</template>
