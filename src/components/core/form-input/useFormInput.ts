import type { VNode } from 'vue'
import { usePropsWithDefaults } from '@/composables/ui'

enum ComponentType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
}

export interface Props {
  /**
   * @model
   */
  modelValue: string | number | null

  /**
   * Readonly input
   */
  isReadonly?: boolean

  /**
   * Disable input
   */
  isDisabled?: boolean

  /**
   * When `true` it will disable the input
   */
  isLoading?: boolean

  /**
   * Native spellcheck, defaults to false
   */
  spellcheck?: boolean

  /**
   * Autofocus input on mount
   */
  autofocus?: boolean

  /**
   * Native input types + `textarea`
   */
  type?: 'text' | 'number' | 'password' | 'email' | 'date' | 'time' | 'textarea'

  /**
   * Textarea height
   */
  textareaHeight?: string
}

const defaultProps = {
  isReadonly: false,
  isDisabled: false,
  isLoading: false,
  spellcheck: false,
  autofocus: false,
  type: 'text',
  placeholder: undefined,
  textareaHeight: '6em',
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const props = usePropsWithDefaults(defaultProps, useAttrs() as unknown as Props)

  const instance = getCurrentInstance()

  // const value = useVModel(toRef(props.value, 'modelValue'))
  const value = computed<Nullable<string | number>>({
    get: () => props.value.modelValue,
    set: (value) => {
      const { type } = props.value

      if (type === 'number') {
        const parsed = parseInt(value as string, 10)

        if (isNaN(parsed)) {
          instance?.emit('update:modelValue', null)
          return
        }

        instance?.emit('update:modelValue', parsed)
      }
      else {
        instance?.emit('update:modelValue', value)
      }
    },
  })

  const isPasswordVisible = ref<boolean>(false)
  const isFocused = ref<boolean>(false)

  const component = computed<ComponentType>(() => {
    if (props.value.type === ComponentType.TEXTAREA)
      return ComponentType.TEXTAREA

    return ComponentType.INPUT
  })

  const inputType = computed<string>(() => {
    if (props.value.type === 'password')
      return isPasswordVisible.value ? 'text' : 'password'

    return props.value.type
  })

  const togglePassword = (): void => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  const clearInputValue = (): void => {
    value.value = null
  }

  const input = computed<VNode>(() => {
    const {
      autofocus,
      type,
      isDisabled,
      isReadonly,
      spellcheck,
      textareaHeight,
    } = props.value

    return h(component.value, {
      value: props.value.modelValue,
      spellcheck,
      type: inputType.value,
      disabled: isDisabled,
      readonly: isReadonly,
      class: [
        'bg-transparent',
        {
          'cursor-not-allowed': isDisabled,
          'cursor-default': isReadonly,
        },
      ],
      style: {
        height: type === 'textarea' ? textareaHeight : undefined,
      },
      onInput: (e: InputEvent) => {
        const element = e.currentTarget as HTMLInputElement
        value.value = element.value
      },
      onFocus: () => {
        isFocused.value = true
      },
      onBlur: () => {
        isFocused.value = false
      },
      onVnodeMounted: ({ el }) => {
        if (autofocus) {
          setTimeout(() => {
            el?.focus()
          }, 0)
        }
      },
    })
  })

  return {
    input,
    togglePassword,
    clearInputValue,
    state: computed<{
      isPasswordVisible: boolean
      isFocused: boolean
      isDisabled: boolean
      isLoading: boolean
      isReadonly: boolean
      type: string
    }>(() => ({
      isPasswordVisible: isPasswordVisible.value,
      isFocused: isFocused.value,
      isDisabled: props.value.isDisabled,
      isLoading: props.value.isLoading,
      isReadonly: props.value.isReadonly,
      type: props.value.type,
    })),
  }
}
