import { AxiosError } from 'axios'

import type { z } from 'zod'
import { useAuth } from '@/composables'

import type { LoginForm, Profile } from '@/models'

type UseLoginFormService = (
  { onSuccess, onError }: {
    onSuccess: (user: Profile) => void | Promise<void>
    onError: (email: string) => void
  }
) => {
  submitForm: (data: LoginForm) => Promise<Nullable<z.ZodFormattedError<LoginForm>>>
}

const useLoginForm: UseLoginFormService = ({ onSuccess, onError }) => {
  const { t } = useI18n()
  const auth = useAuth()

  const submitForm = async ({ email, password }: LoginForm): Promise<any> => {
    try {
      await auth.signIn(email, password)
      const user = await auth.getUser()

      await onSuccess(user)
    }
    catch (err) {
      onError(email)

      if (err instanceof AxiosError) {
        const { response } = err

        if (response !== undefined && [400, 401].includes(response.status)) {
          return {
            password: {
              _errors: [t('auth.login_form.invalid_email_or_password')],
            },
          }
        }
        else {
          throw err
        }
      }
      else { throw err }
    }

    return null
  }

  return {
    submitForm,
  }
}

export default useLoginForm
