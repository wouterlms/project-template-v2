import { useDarkMode } from '@/composables/ui'

const { detectTheme, isDark } = useDarkMode()

detectTheme()

const toCssVar = (name: string): string => `--${name}`

const cssVarToRgb = (value: string): string => {
  const [
    r, g, b,
  ] = value.trim().split(', ')

  return `rgb(${r}, ${g}, ${b})`
}

export const getCssVar = (name: string): string => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(toCssVar(name))

  if (value === '')
    return ''

  const formattedRgbValue = cssVarToRgb(value)

  return formattedRgbValue
}

// eslint-disable-next-line require-explicit-generics/require-explicit-generics
export const colors = reactive({
  'accent-primary': getCssVar('accent-primary'),
  'accent-secondary': getCssVar('accent-secondary'),
  'accent-primary-inverted': getCssVar('accent-primary-inverted'),
  'accent-secondary-inverted': getCssVar('accent-secondary-inverted'),

  'accent-success': getCssVar('accent-success'),
  'accent-success-100': getCssVar('accent-success-100'),
  'accent-success-200': getCssVar('accent-success-200'),
  'accent-success-300': getCssVar('accent-success-300'),
  'accent-success-400': getCssVar('accent-success-400'),
  'accent-success-500': getCssVar('accent-success-500'),
  'accent-success-600': getCssVar('accent-success-600'),
  'accent-success-700': getCssVar('accent-success-700'),
  'accent-success-800': getCssVar('accent-success-800'),
  'accent-success-900': getCssVar('accent-success-900'),

  'accent-warning': getCssVar('accent-warning'),
  'accent-warning-100': getCssVar('accent-warning-100'),
  'accent-warning-200': getCssVar('accent-warning-200'),
  'accent-warning-300': getCssVar('accent-warning-300'),
  'accent-warning-400': getCssVar('accent-warning-400'),
  'accent-warning-500': getCssVar('accent-warning-500'),
  'accent-warning-600': getCssVar('accent-warning-600'),
  'accent-warning-700': getCssVar('accent-warning-700'),
  'accent-warning-800': getCssVar('accent-warning-800'),
  'accent-warning-900': getCssVar('accent-warning-900'),

  'accent-danger': getCssVar('accent-danger'),
  'accent-danger-100': getCssVar('accent-danger-100'),
  'accent-danger-200': getCssVar('accent-danger-200'),
  'accent-danger-300': getCssVar('accent-danger-300'),
  'accent-danger-400': getCssVar('accent-danger-400'),
  'accent-danger-500': getCssVar('accent-danger-500'),
  'accent-danger-600': getCssVar('accent-danger-600'),
  'accent-danger-700': getCssVar('accent-danger-700'),
  'accent-danger-800': getCssVar('accent-danger-800'),
  'accent-danger-900': getCssVar('accent-danger-900'),

  'neutral': getCssVar('neutral'),
  'neutral-50': getCssVar('neutral-50'),
  'neutral-100': getCssVar('neutral-100'),
  'neutral-200': getCssVar('neutral-200'),
  'neutral-300': getCssVar('neutral-300'),
  'neutral-400': getCssVar('neutral-400'),
  'neutral-500': getCssVar('neutral-500'),
  'neutral-600': getCssVar('neutral-600'),
  'neutral-700': getCssVar('neutral-700'),
  'neutral-800': getCssVar('neutral-800'),
  'neutral-900': getCssVar('neutral-900'),

  'text-primary': getCssVar('text-primary'),
  'text-primary-inverted': getCssVar('text-primary-inverted'),
  'text-secondary': getCssVar('text-secondary'),
  'text-secondary-inverted': getCssVar('text-secondary-inverted'),
  'text-tertiary': getCssVar('text-tertiary'),
  'text-tertiary-inverted': getCssVar('text-tertiary-inverted'),
  'text-input': getCssVar('text-input'),
  'text-input-placeholder': getCssVar('text-input-placeholder'),
  'text-input-disabled': getCssVar('text-input-disabled'),

  'bg-primary': getCssVar('bg-primary'),
  'bg-primary-inverted': getCssVar('bg-primary-inverted'),
  'bg-secondary': getCssVar('bg-secondary'),
  'bg-secondary-inverted': getCssVar('bg-secondary-inverted'),
  'bg-tertiary': getCssVar('bg-tertiary'),
  'bg-tertiary-inverted': getCssVar('bg-tertiary-inverted'),
  'bg-input': getCssVar('bg-input'),
  'bg-input-disabled': getCssVar('bg-input-disabled'),
  'bg-switch': getCssVar('bg-switch'),

  'border-input': getCssVar('border-input'),
})

export type Color = keyof typeof colors

export const getColor = (color: Color | string): string => colors[color as Color] ?? color

setTimeout(() => {
  watch(isDark, () => {
    for (const color in colors)
      colors[color as Color] = getCssVar(color)
  }, {
    flush: 'post',
    immediate: true,
  })
}, 0)
