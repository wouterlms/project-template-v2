export default (): Record<string, string> => {
  const route = useRoute()

  return reactive(route.params) as any
}
