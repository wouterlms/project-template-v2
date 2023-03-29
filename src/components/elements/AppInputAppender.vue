<script setup lang="ts">
interface Props {
  value: string | null
}

const { value } = defineProps<Props>()

const wrapperEl = ref<HTMLElement | null>(null)
const appendContentEl = ref<HTMLElement | null>(null)
const maxWidth = ref<string>('0px')
const isMounted = ref<boolean>(false)

const style = reactive<{
  fontSize: string
  paddingLeft: string
}>({
  fontSize: '0px',
  paddingLeft: '0px',
})

onMounted(() => {
  isMounted.value = true
})

watch([
  (): string | null => value,
  isMounted,
], () => {
  const input = (wrapperEl.value!.querySelector('input') ?? null) as HTMLInputElement | null

  if (input === null)
    throw new Error('No input element found')

  const {
    fontSize,
    paddingLeft,
    paddingRight,
    width,
  } = getComputedStyle(input)

  const { width: contentWidth } = getComputedStyle(appendContentEl.value!)

  style.fontSize = fontSize
  style.paddingLeft = `${input.offsetLeft + parseFloat(paddingLeft)}px`

  // - 1px so it doesn't overlap with the input border
  maxWidth.value = `calc(${width} - ${contentWidth} - ${paddingRight} - 1px)`
})
</script>

<template>
  <div
    ref="wrapperEl"
    class="relative"
  >
    <slot />

    <div
      class="pointer-events-none
      absolute
      left-[1px]
      top-1/2
      flex
      h-full
      -translate-y-1/2
      items-center"
      :style="style"
    >
      <span
        :style="{
          maxWidth,
        }"
        class="whitespace-pre opacity-0"
      >
        {{ value }}
      </span>

      <div
        ref="appendContentEl"
        class="bg-input flex h-[75%] items-center"
      >
        <slot name="append" />
      </div>
    </div>
  </div>
</template>
