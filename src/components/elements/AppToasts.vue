<script setup lang="ts">
import { useToasts } from '@/composables'

const { toast } = useToasts()

const showToast = computed<boolean>(() => toast.value !== null)
</script>

<template>
  <Transition
    mode="out-in"
    name="toast-transition"
  >
    <div
      v-if="showToast && toast !== null"
      :key="toast.id"
      class="bg-primary-inverted
        text-primary-inverted
        fixed
        bottom-6
        left-1/2
        z-20
        -translate-x-1/2
        rounded
        px-2.5
        py-2
        text-sm"
    >
      {{ toast.message }}
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.toast-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-from {
    transform: translate(-50%, 70%);
  }
}
</style>
