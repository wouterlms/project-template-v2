import { z } from 'zod'

import { http } from '@/http'
import type { ResetPasswordDto, ResetPasswordForm } from '@/models'
import { resetPasswordDto } from '@/models'

const transformRequestData = (data: ResetPasswordForm): ResetPasswordDto => ({
  ...data,
  passwordConfirmation: data.password,
})

export const resetPassword = async (data: ResetPasswordForm): Promise<Record<string, never>> => (
  await http.post('/api/reset-password', {
    data: transformRequestData(data),
    requestSchema: resetPasswordDto,
    responseSchema: z.object({}),
  })
)

