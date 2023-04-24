import {
  ref,
  watch,
} from 'vue'

const isDark = ref<boolean>(false)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const setThemeValue = (): void => {
    if (window.matchMedia == null)
      return

    isDark.value = matchMedia('(prefers-color-scheme: dark)').matches
  }

  const detectTheme = (): void => {
    if (window.matchMedia == null)
      return

    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      setThemeValue()
    })

    setThemeValue()
  }

  watch(isDark, (isDark) => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')

    if (isDark)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  })

  return {
    isDark,
    detectTheme,
  }
}
