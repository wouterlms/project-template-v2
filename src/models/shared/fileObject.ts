import { z } from 'zod'

export const fileObject = z.object({
  id: z.string().uuid().nullish(),
  uuid: z.string().uuid().nullish(),
  name: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  url: z.string().url(),
})

export type FileObject = z.infer<typeof fileObject>
