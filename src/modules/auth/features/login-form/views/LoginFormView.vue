<script setup lang="ts">
import { useForm } from '@appwise/forms'
import { AxiosError } from 'axios'
import type { z } from 'zod'

import { Route } from '@/enums'
import type { LoginForm } from '@/models'
import { loginForm } from '@/models'
import { useAuthStore } from '@/stores'

import {
  useForgotPasswordStore,
  useLoginStore,
} from '../../../stores'
import { useLoginFormUtils } from '../composables'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const loginStore = useLoginStore()
const forgotPasswordStore = useForgotPasswordStore()

const submit = async (
  { email, password }: LoginForm,
): Promise<Nullable<z.ZodFormattedError<LoginForm>>> => {
  try {
    const user = await authStore.signIn(email, password)

    forgotPasswordStore.setLastLoginAttemptEmail(null)
    loginStore.setLastLoggedInUser(user)

    await router.replace('/')
  }
  catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err

      if (response !== undefined && [400, 401].includes(response.status)) {
        forgotPasswordStore.setLastLoginAttemptEmail(email)

        return {
          password: {
            _errors: [t('auth.login_form.invalid_email_or_password')],
          },
        } as unknown as z.ZodFormattedError<LoginForm>
      }
      else {
        throw err
      }
    }
  }

  return null
}

const form = useForm(loginForm, {
  onSubmit: submit,
})

const { title } = useLoginFormUtils()
</script>

<template>
  <AuthPage
    :description="t('auth.login_form.sign_in_to_continue')"
    :title="title"
  >
    <FormElement :form="form">
      <FormSpacer>
        <FormInput
          v-bind="form.register('email')"
          :label="t('common.email')"
          type="email"
        />

        <FormInput
          v-bind="form.register('password')"
          :label="t('common.password')"
          type="password"
        />
      </FormSpacer>

      <RouterLink
        :to="{ name: Route.FORGOT_PASSWORD }"
        class="mt-1.5 self-start hover:underline"
      >
        <AppText variant="body-1">
          {{ t('auth.login_form.forgot_password') }}
        </AppText>
      </RouterLink>

      <FormButton
        :form="form"
        class="mt-6 w-full"
        padding="1.2em"
      >
        {{ t('common.sign_in') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
