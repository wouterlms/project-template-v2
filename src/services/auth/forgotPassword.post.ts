import { z } from 'zod'

import { http } from '@/http'
import type { ForgotPasswordDto, ForgotPasswordForm } from '@/models'
import { forgotPasswordDto } from '@/models'

const transformRequestData = (data: ForgotPasswordForm): ForgotPasswordDto => ({
  ...data,
})

export default async (data: ForgotPasswordForm): Promise<Record<string, never>> => (
  await http.post('/forgot-password', {
    data: transformRequestData(data),
    requestSchema: forgotPasswordDto,
    responseSchema: z.object({}),
  })
)
