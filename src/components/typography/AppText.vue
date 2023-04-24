<script setup lang="ts">
interface Props {
  variant: 'body-1' | 'body-2' | 'caption' | 'display-1' | 'display-2' | 'display-3' | 'display-4' | 'headline' | 'title'
  truncate?: boolean | number
  as?: string
}

const {
  as,
  truncate = false,
  variant,
} = defineProps<Props>()

const classes = computed<string>(() => {
  const classes: string[] = []

  if (truncate === true || typeof truncate === 'number')
    classes.push('truncate')

  switch (variant) {
    case 'display-4':
      classes.push('text-4xl md:text-5xl text-primary')
      break
    case 'display-3':
      classes.push('text-3xl md:text-4xl text-primary')
      break
    case 'display-2':
      classes.push('text-2xl md:text-3xl text-primary')
      break
    case 'display-1':
      classes.push('text-xl: md:text-2xl text-primary')
      break
    case 'headline':
      classes.push('text-lg md:text-xl text-primary')
      break
    case 'title':
      classes.push('text-lg text-secondary')
      break
    case 'body-2':
      classes.push('text-base text-secondary')
      break
    case 'body-1':
      classes.push('text-sm text-secondary')
      break
    case 'caption':
      classes.push('text-xs text-secondary')
      break
  }

  return classes.join(' ')
})

const component = computed<string>(() => {
  if (as !== undefined)
    return as

  switch (variant) {
    case 'display-4':
    case 'display-3':
    case 'display-2':
    case 'display-1':
    case 'headline':
      return 'h1'
    default:
      return 'p'
  }
})

const styles = computed<Record<string, string>>(() => {
  const styles: Record<string, string> = {}

  if (typeof truncate === 'number') {
    styles.overflow = 'hidden'
    styles.display = '-webkit-box'
    styles['-webkit-line-clamp'] = truncate.toString()
    styles['-webkit-box-orient'] = 'vertical'
  }

  return styles
})
</script>

<template>
  <Component
    :is="component"
    :class="classes"
    :style="styles"
  >
    <slot />
  </Component>
</template>
