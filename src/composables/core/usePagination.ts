import { z } from 'zod'
import { http } from '@/http'

const metaSchema = z.object({
  currentPage: z.number(),
  from: z.number().nullable(),
  to: z.number().nullable(),
  lastPage: z.number(),
  perPage: z.number(),
  total: z.number(),
  path: z.string().url(),
})

const linksSchema = z.object({
  first: z.string().url(),
  last: z.string().url(),
  prev: z.string().url().nullable(),
  next: z.string().url().nullable(),
})

type Meta = z.infer<typeof metaSchema>
type Links = z.infer<typeof linksSchema>

export type UsePagination = <T extends z.ZodType>(
  url: string,
  schema: T,
  queryParams?: Record<string, Nullable<string | number>>
) => {
  data: Array<z.infer<T>>
  meta: Nullable<Meta>
  isLoading: boolean
  previous: () => Promise<void>
  next: () => Promise<void>
}

const usePagination: UsePagination = <T extends z.ZodType>(
  url: string,
  schema: T,
  queryParams?: Record<string, Nullable<string | number>>,
) => {
  const urlWithQueryParams = computed<string>(() => {
    const filteredQueryParams = Object.fromEntries(
      Object.entries(queryParams ?? {}).filter(([, value]) => value !== null && value !== ''),
    ) as Record<string, string>

    const params = new URLSearchParams(filteredQueryParams)

    if (params.toString() === '')
      return url

    return `${url}?${params.toString()}`
  })

  const links = ref<Nullable<Links>>(null)
  const meta = ref<Nullable<Meta>>(null)
  const data = ref<z.infer<z.ZodArray<T>>>([])
  const isLoading = ref<boolean>(false)

  const previous = async (): Promise<void> => {
    if (isLoading.value || links.value?.prev === null)
      return

    isLoading.value = true

    const url = links.value?.prev ?? urlWithQueryParams.value

    const response = await http.get(url, {
      responseSchema: z.object({
        data: z.array(schema),
        links: linksSchema,
        meta: metaSchema,
      }),
    })

    data.value = response.data as any
    meta.value = response.meta
    links.value = response.links

    isLoading.value = false
  }

  const next = async (resetData = false): Promise<void> => {
    if (isLoading.value || (links.value !== null && links.value.next === null))
      return

    isLoading.value = true

    const url = links.value?.next ?? urlWithQueryParams.value

    const response = await http.get(url, {
      responseSchema: z.object({
        data: z.array(schema),
        links: linksSchema,
        meta: metaSchema,
      }),
    })

    if (resetData)
      data.value = response.data as any
    else
      data.value = [...data.value, ...response.data] as any

    meta.value = response.meta
    links.value = response.links

    isLoading.value = false
  }

  watch(urlWithQueryParams, () => {
    links.value = null
    meta.value = null
    void next(true)
  })

  // eslint-disable-next-line require-explicit-generics/require-explicit-generics
  return reactive({
    data,
    meta,
    isLoading,
    previous,
    next,
  })
}

export default usePagination
