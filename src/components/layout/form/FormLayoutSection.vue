<script setup lang="ts">
interface Props {
  title: string
  description?: string
  hasDivider?: boolean
}

const { hasDivider = false } = defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'border-b border-solid border-neutral-200 pb-8 lg:pb-12': hasDivider,
    }"
    :style="{
      gridTemplateColumns: '1.5fr 2fr',
    }"
    class="lg:grid lg:gap-x-12"
  >
    <div>
      <AppText
        class="font-medium"
        variant="headline"
      >
        {{ title }}
      </AppText>

      <!-- eslint-disable vue/no-v-text-v-html-on-component -->
      <AppText
        v-if="description != null"
        class="text-tertiary mt-2 max-w-md"
        variant="body-1"
        v-html="description"
      />
      <!-- eslint-enable vue/no-v-text-v-html-on-component -->
    </div>

    <div class="mt-6 lg:mt-2">
      <slot />
    </div>
  </div>
</template>
