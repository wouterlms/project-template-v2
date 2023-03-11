import type { RouteLocation } from 'vue-router'

export interface Breadcrumb {
  label: string
  to?: RouteLocation | any
}
