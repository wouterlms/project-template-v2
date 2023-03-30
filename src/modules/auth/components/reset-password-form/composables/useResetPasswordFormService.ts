import type { z } from 'zod'

import { authService } from '../../../services'
import { transformApiErrors } from '@/utils'

import { mapResetPasswordFormToDto } from '@/models'
import type { ResetPasswordForm } from '@/models'

type UseResetPasswordFormService = (
  { onSuccess }: { onSuccess: (email: string, password: string) => void | Promise<void> }
) => {
  submitForm: (data: ResetPasswordForm) => Promise<Omit<z.ZodFormattedError<ResetPasswordForm>, '_errors'>>
}

const useResetPasswordForm: UseResetPasswordFormService = ({ onSuccess }) => {
  const submitForm: ReturnType<UseResetPasswordFormService>['submitForm'] = async (
    data: ResetPasswordForm,
  ): Promise<any> => {
    try {
      const { email, password } = data

      await authService.resetPassword(mapResetPasswordFormToDto(data))
      await onSuccess(email, password)
    }
    catch (err) {
      return transformApiErrors(err)
    }
  }

  return {
    submitForm,
  }
}

export default useResetPasswordForm
