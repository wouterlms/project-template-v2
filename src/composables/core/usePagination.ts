import { z } from 'zod'
import type { Ref } from 'vue'

import { http } from '@/plugins'

const metaSchema = z.object({
  currentPage: z.number(),
  from: z.number(),
  to: z.number(),
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

export interface UsePagination<T> {
  data: T[]
  meta: Nullable<Meta>
  isLoading: boolean
  previous: () => Promise<void>
  next: () => Promise<void>
}

export default <T extends z.ZodObject<any>>(
  url: string | Ref<string>,
  schema: T,
): UsePagination<z.infer<T>> => {
  const urlRef = isRef(url) ? url : ref(url)

  const links = ref<Nullable<Links>>(null)
  const meta = ref<Nullable<Meta>>(null)
  const data = ref<z.infer<z.ZodArray<T>>>([])
  const isLoading = ref(false)

  const previous = async (): Promise<void> => {
    if (isLoading.value || links.value?.prev === null)
      return

    isLoading.value = true

    const url = links.value?.prev ?? urlRef.value

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

    const url = links.value?.next ?? urlRef.value

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

  watch(urlRef, () => {
    links.value = null
    meta.value = null
    void next(true)
  })

  return reactive<any>({
    data,
    meta,
    isLoading,
    previous,
    next,
  })
}
