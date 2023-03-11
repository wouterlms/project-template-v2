<script setup lang="ts">
interface Props {
  as?: string | Object
}

const { as = 'button' } = defineProps<Props>()
</script>

<template>
  <Component
    :is="as"
    type="button"
    class="rounded outline-offset-[3px] outline-inherit duration-200"
  >
    <slot />
  </Component>
</template>
