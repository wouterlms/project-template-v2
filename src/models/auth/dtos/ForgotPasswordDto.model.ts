import { z } from 'zod'
import type { ForgotPasswordForm } from '../forms'

export const forgotPasswordDto = z.object({
  email: z.string().email(),
})

export type ForgotPasswordDto = z.infer<typeof forgotPasswordDto>

export const mapForgotPasswordFormToDto = (data: ForgotPasswordForm): ForgotPasswordDto => ({
  ...data,
})
