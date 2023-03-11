<script setup lang="ts">
interface Props {
  as?: string | Object
}

const { as = 'div' } = defineProps<Props>()
</script>

<template>
  <Component
    :is="as"
    class="mx-auto w-full max-w-[80rem] px-8 text-left md:px-16"
  >
    <slot />
  </Component>
</template>
