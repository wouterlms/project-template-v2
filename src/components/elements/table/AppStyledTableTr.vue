<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="even:bg-neutral-50">
    <AppTableTr
      v-bind="$attrs"
      class="py-4"
    >
      <slot />
    </AppTableTr>
  </div>
</template>
