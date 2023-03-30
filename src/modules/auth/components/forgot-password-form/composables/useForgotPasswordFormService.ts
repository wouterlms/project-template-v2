import type { z } from 'zod'
import { authService } from '../../../services'
import { transformApiErrors } from '@/utils'

import { mapForgotPasswordFormToDto } from '@/models'
import type { ForgotPasswordForm } from '@/models'

type UseForgotPasswordFormService = (
  { onSuccess }: { onSuccess: () => void | Promise<void> }
) => {
  submitForm: (
    data: ForgotPasswordForm
  ) => Promise<Omit<z.ZodFormattedError<ForgotPasswordForm>, '_errors'>>
}

const useForgotPasswordForm: UseForgotPasswordFormService = ({ onSuccess }) => {
  const submitForm: ReturnType<UseForgotPasswordFormService>['submitForm'] = async (
    data: ForgotPasswordForm,
  ) => {
    try {
      await authService.forgotPassword(mapForgotPasswordFormToDto(data))
      await onSuccess()
    }
    catch (err) {
      return transformApiErrors(err)
    }

    return {}
  }

  return {
    submitForm,
  }
}

export default useForgotPasswordForm
