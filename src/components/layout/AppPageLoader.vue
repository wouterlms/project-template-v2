<script setup lang="ts">
import { usePageLoader } from '@/composables'

const {
  progress,
  showProgressBar,
} = usePageLoader()

const transitionDuration = ref<number>(1000)

watch(progress, () => {
  if (progress.value === 0) {
    transitionDuration.value = 0

    setTimeout(() => {
      transitionDuration.value = 1000
    }, 0)
  }
})
</script>

<template>
  <Transition name="transition">
    <div
      v-if="showProgressBar"
      class="fixed left-0 top-0 z-30 h-[3px] w-full"
    >
      <div
        :style="{
          transition: 'cubic-bezier(0.25, 0.19, 0.01, 0.98)',
          width: `${progress}%`,
          transitionDuration: `${transitionDuration}ms`,
        }"
        class="bg-accent-primary h-full"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.transition {
  &-enter-active {
    transition: 0.3s;
  }

  &-leave-active {
    transition: 1s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
