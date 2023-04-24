<script setup lang="ts">
interface Props {
  title: string
  description: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div>
    <AppText
      class="font-medium"
      variant="display-2"
    >
      {{ title }}
    </AppText>

    <AppText
      v-if="description"
      class="mt-2"
      variant="body-2"
    >
      {{ description }}
    </AppText>

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>
