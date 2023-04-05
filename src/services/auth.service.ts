import { z } from 'zod'
import { http } from '@/http'
import { forgotPasswordDto, resetPasswordDto } from '@/models'
import type { ForgotPasswordDto, ResetPasswordDto } from '@/models'

export const forgotPassword = async (data: ForgotPasswordDto): Promise<Record<string, never>> => (
  await http.post('/forgot-password', {
    data,
    requestSchema: forgotPasswordDto,
    responseSchema: z.object({}),
  })
)

export const resetPassword = async (data: ResetPasswordDto): Promise<Record<string, never>> => (
  await http.post('/api/reset-password', {
    data,
    requestSchema: resetPasswordDto,
    responseSchema: z.object({}),
  })
)
