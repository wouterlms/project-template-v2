import type { HTMLAttributes } from 'vue'
import {
  computed,
  useAttrs,
} from 'vue'

interface StylingAttrs {
  style: HTMLAttributes['style']
  class: HTMLAttributes['class']
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const attrs = useAttrs()

  const nonStylingAttrs = computed<Record<string, unknown>>(() => ({
    ...attrs,
    class: undefined,
    style: undefined,
  }))

  const stylingAttrs = computed<StylingAttrs>(() => {
    const { class: className, style } = attrs

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      style,
      class: className,
    } as StylingAttrs
  })

  return {
    nonStylingAttrs,
    stylingAttrs,
  }
}
