<script setup lang="ts">
interface Props {
  as?: Record<string, unknown> | string
}

const { as = 'button' } = defineProps<Props>()
</script>

<template>
  <Component
    :is="as"
    class="outline-offset-[3px] outline-inherit duration-200"
    type="button"
  >
    <slot />
  </Component>
</template>
