<script setup lang="ts">
interface Props {
  enterFromClass?: string
  leaveToClass?: string
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  duration?: number
}

const {
  enterFromClass = 'opacity-0',
  leaveToClass = 'opacity-0',
  easing = 'ease',
  duration = 500,
} = defineProps<Props>()

const durationString = computed(() => `${duration}ms`)
</script>

<template>
  <div class="relative">
    <TransitionGroup
      :enter-from-class="enterFromClass"
      :leave-to-class="leaveToClass"
      name="list"
    >
      <slot />
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
.list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: v-bind(durationString) v-bind(easing);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
