import { z } from 'zod'
import { http } from '@/plugins'
import { forgotPasswordDto, resetPasswordDto } from '@/models'
import type { ForgotPasswordDto, ResetPasswordDto } from '@/models'

const { VITE_API_BASE_URL } = import.meta.env

export const forgotPassword = async (data: ForgotPasswordDto): Promise<Record<string, never>> => (
  await http.post('/api/forgot-password', {
    data,
    requestSchema: forgotPasswordDto,
    responseSchema: z.object({}),
    config: {
      baseURL: VITE_API_BASE_URL,
    },
  })
)

export const resetPassword = async (data: ResetPasswordDto): Promise<Record<string, never>> => (
  await http.post('/api/reset-password', {
    data,
    requestSchema: resetPasswordDto,
    responseSchema: z.object({}),
    config: {
      baseURL: VITE_API_BASE_URL,
    },
  })
)
