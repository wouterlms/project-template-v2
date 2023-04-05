import { z } from 'zod'

export const resetPasswordDto = z.object({
  token: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
})

export type ResetPasswordDto = z.infer<typeof resetPasswordDto>
