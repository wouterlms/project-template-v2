import { z } from 'zod'
import { user } from '../users'

export const profile = z.object({}).merge(user)

export type Profile = z.infer<typeof profile>
