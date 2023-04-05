import type { ResetPasswordDto, ResetPasswordForm } from '@/models'

export const mapResetPasswordFormToDto = (data: ResetPasswordForm): ResetPasswordDto => ({
  ...data,
  passwordConfirmation: data.password,
})
