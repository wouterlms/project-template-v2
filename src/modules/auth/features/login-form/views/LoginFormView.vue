<script setup lang="ts">
import { useForm } from '@appwise/forms'
import { AxiosError } from 'axios'
import type { z } from 'zod'

import { useLoginFormUtils } from '../composables'
import { useForgotPasswordStore, useLoginStore } from '../../../stores'

import { useAuth } from '@/composables'

import { loginForm } from '@/models'
import { Route } from '@/enums'
import type { LoginForm } from '@/models'

const { t } = useI18n()
const router = useRouter()
const auth = useAuth()
const loginStore = useLoginStore()
const forgotPasswordStore = useForgotPasswordStore()

const submit = async (
  { email, password }: LoginForm,
): Promise<z.ZodFormattedError<LoginForm> | void> => {
  try {
    await auth.signIn(email, password)
    const user = await auth.getUser()

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
}

const form = useForm(loginForm, {
  onSubmit: submit,
})

const { title } = useLoginFormUtils()
</script>

<template>
  <AuthPage
    :title="title"
    :description="t('auth.login_form.sign_in_to_continue')"
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
        padding="1.2em"
        class="mt-6 w-full"
      >
        {{ t('common.sign_in') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
