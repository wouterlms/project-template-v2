import type { ForgotPasswordDto, ForgotPasswordForm } from '@/models'

export const mapForgotPasswordFormToDto = (data: ForgotPasswordForm): ForgotPasswordDto => ({
  ...data,
})
