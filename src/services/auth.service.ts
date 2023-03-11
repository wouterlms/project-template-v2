import { z } from 'zod'
import { http } from '@/plugins'
import type { ForgotPasswordDto, ResetPasswordDto } from '@/models'

const { VITE_API_BASE_URL } = import.meta.env

export const forgotPassword = async (data: ForgotPasswordDto): Promise<Record<string, never>> => (
  await http.post('/api/forgot-password', {
    data,
    schema: z.object({}),
    config: {
      baseURL: VITE_API_BASE_URL,
    },
  })
)

export const resetPassword = async (data: ResetPasswordDto): Promise<Record<string, never>> => (
  await http.post('/api/reset-password', {
    data,
    schema: z.object({}),
    config: {
      baseURL: VITE_API_BASE_URL,
    },
  })
)
