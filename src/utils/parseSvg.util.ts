export const parseSvg = (svg: string): {
  paths: string
  viewbox: string
} => {
  const paths = svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')
  const viewbox = svg.match(/viewBox="([^"]*)"/)?.[1] ?? ''

  const pathsWithoutFill = paths.replace(/fill="[^"]*"/g, 'fill="currentColor"')

  return {
    paths: pathsWithoutFill,
    viewbox,
  }
}
