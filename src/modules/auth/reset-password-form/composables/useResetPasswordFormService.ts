import { transformApiErrors } from '@/utils'
import { authService } from '@/services'

import type { ResetPasswordForm } from '@/models'

type UseResetPasswordFormService = (
  { onSuccess }: { onSuccess: (email: string, password: string) => void | Promise<void> }
) => {
  submitForm: (data: ResetPasswordForm) => Promise<any>
}

const useResetPasswordForm: UseResetPasswordFormService = ({ onSuccess }) => {
  const submitForm = async (data: ResetPasswordForm): Promise<any> => {
    const { token, email, password } = data

    try {
      await authService.resetPassword({
        token,
        email,
        password,
        passwordConfirmation: password,
      })

      await onSuccess(email, password)
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

export default useResetPasswordForm
