import { transformApiErrors } from '@/utils'
import { authService } from '@/services'

import type { ForgotPasswordForm } from '@/models'

type UseForgotPasswordFormService = (
  { onSuccess }: { onSuccess: () => void | Promise<void> }
) => {
  submitForm: (data: ForgotPasswordForm) => Promise<any>
}

const useForgotPasswordForm: UseForgotPasswordFormService = ({ onSuccess }) => {
  const submitForm = async (data: ForgotPasswordForm): Promise<any> => {
    try {
      await authService.forgotPassword(data)
      await onSuccess()
    }
    catch (err) {
      return transformApiErrors(err)
    }

    return null
  }

  return {
    submitForm,
  }
}

export default useForgotPasswordForm
