import type { InjectionKey } from 'vue'

export default <T>(injectionKey: InjectionKey<T>): NonNullable<T> => {
  const data = inject<T>(injectionKey) ?? null

  if (data === null)
    throw new Error(`Injection key ${injectionKey.description!} has not been provided`)

  return data
}
