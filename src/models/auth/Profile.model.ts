import { z } from 'zod'

export const profile = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
})

export type Profile = z.infer<typeof profile>
