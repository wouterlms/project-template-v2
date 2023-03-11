import { z } from 'zod'

export const resetPasswordForm = z.object({
  token: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export type ResetPasswordForm = z.infer<typeof resetPasswordForm>
