import { z } from 'zod'

export const translatable = z.record(z.string().min(1))

export type Translatable = z.infer<typeof translatable>
