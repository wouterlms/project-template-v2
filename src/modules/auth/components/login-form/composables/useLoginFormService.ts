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
  submitForm: (data: LoginForm) => Promise<Omit<z.ZodFormattedError<LoginForm>, '_errors'>>
}

const useLoginForm: UseLoginFormService = ({ onSuccess, onError }) => {
  const { t } = useI18n()
  const auth = useAuth()

  const submitForm: ReturnType<UseLoginFormService>['submitForm'] = async (
    { email, password }: LoginForm,
  ) => {
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

    return {}
  }

  return {
    submitForm,
  }
}

export default useLoginForm
