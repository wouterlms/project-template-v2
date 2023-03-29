import { RouterLink } from 'vue-router'
import type { ComputedRef, VNode } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { usePropsWithDefaults } from '@/composables/ui'

export interface BaseProps {
  /**
   * The route when the button is clicked. Renders a `<RouterLink>` element.
   */
  to?: RouteLocationRaw

  /**
   * The URL to navigate to when the button is clicked. Renders an `<a>` element.
   */
  href?: string

  /**
   * The type of the native button element. Defaults to 'button'.
   */
  type?: string

  /**
   * Whether the button is disabled or not.
   */
  isDisabled?: boolean

  /**
   * Whether to show a loading indicator and disable the button.
   */
  isLoading?: boolean
}

type UseAppButton = () => {
  button: ComputedRef<VNode>
  state: {
    isLoading: boolean
    isDisabled: boolean
  }
}

const useAppButton: UseAppButton = () => {
  const defaultProps = {
    type: 'button',
    isDisabled: false,
    isLoading: false,
    to: undefined,
    href: undefined,
  }

  const props = usePropsWithDefaults(defaultProps, useAttrs() as BaseProps)

  const component = computed<typeof RouterLink | string>(() => {
    if (props.value.to !== undefined)
      return RouterLink

    if (props.value.href !== undefined)
      return 'a'

    return 'button'
  })

  const button = computed<VNode>(() => {
    const {
      isLoading,
      isDisabled,
      to,
      href,
      type,
    } = props.value

    const buttonProps: Record<string, unknown> = {
      to,
      type: to == null && href == null ? type : undefined,
      disabled: isLoading || isDisabled,
      class: [
        'inline-block',
        isDisabled || isLoading
          ? 'cursor-not-allowed'
          : 'cursor-pointer',
      ],
    }

    if (href !== undefined)
      buttonProps.href = href

    return h(component.value as string | VNode, buttonProps)
  })

  return {
    button,
    state: reactive<{
      isLoading: boolean
      isDisabled: boolean
    }>({
      isLoading: computed<boolean>(() => props.value.isLoading) as unknown as boolean,
      isDisabled: computed<boolean>(() => props.value.isDisabled) as unknown as boolean,
    }),
  }
}

export default useAppButton
