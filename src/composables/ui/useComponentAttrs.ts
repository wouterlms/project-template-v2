import type { HTMLAttributes } from 'vue'
import { computed, useAttrs } from 'vue'

interface StylingAttrs {
  style: HTMLAttributes['style']
  class: HTMLAttributes['class']
}

type UseComponentAttrs = () => {
  listeners: Record<string, unknown>
  functional: Record<string, unknown>
  styling: StylingAttrs
}

const useComponentAttrs: UseComponentAttrs = () => {
  const attrs = useAttrs()

  const listeners = computed<Record<string, unknown>>(() => {
    const onAttrs: Record<string, unknown> = {}

    Object.entries(attrs).forEach(([
      key,
      value,
    ]) => {
      if (key.startsWith('on') && typeof value === 'function')
        onAttrs[key] = value
    })

    return onAttrs
  })

  const functional = computed<Record<string, unknown>>(() => ({
    ...attrs,
    class: undefined,
    style: undefined,
  }))

  const styling = computed<StylingAttrs>(() => {
    const { class: className, style } = attrs

    return {
      style: style as HTMLAttributes['style'],
      class: className,
    }
  })

  return reactive<any>({
    listeners,
    styling,
    functional,
  })
}

export default useComponentAttrs
