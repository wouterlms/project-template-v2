import { z } from 'zod'
import type { ResetPasswordForm } from '../forms'

export const resetPasswordDto = z.object({
  token: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
})

export type ResetPasswordDto = z.infer<typeof resetPasswordDto>

export const mapResetPasswordFormToDto = (data: ResetPasswordForm): ResetPasswordDto => ({
  ...data,
  passwordConfirmation: data.password,
})
