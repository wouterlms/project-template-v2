import { z } from 'zod'

import { user } from '../users'

export const authenticatedUser = z.object({}).merge(user)

export type AuthenticatedUser = z.infer<typeof authenticatedUser>
