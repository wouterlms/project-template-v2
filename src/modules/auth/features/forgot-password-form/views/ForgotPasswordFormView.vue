<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { z } from 'zod'

import { Route } from '@/enums'
import type { ForgotPasswordForm, ResetPasswordForm } from '@/models'
import { forgotPasswordForm } from '@/models'
import { authService } from '@/services'
import { transformApiErrors } from '@/utils'

import { useForgotPasswordStore } from '../../../stores'

const { t } = useI18n()

const forgotPasswordStore = useForgotPasswordStore()

const { lastLoginAttemptEmail } = forgotPasswordStore
const hasSentEmail = forgotPasswordStore.hasSentEmail

const submit = async (
  data: ForgotPasswordForm,
): Promise<Nullable<z.ZodFormattedError<ResetPasswordForm>>> => {
  try {
    await authService.forgotPassword(data)
    forgotPasswordStore.setHasSentEmail(true)
  }
  catch (err) {
    return transformApiErrors(err)
  }

  return null
}

const form = useForm(forgotPasswordForm, {
  onSubmit: submit,
})

const email = form.register('email', lastLoginAttemptEmail ?? undefined)

onBeforeUnmount(() => {
  forgotPasswordStore.setHasSentEmail(false)
})
</script>

<template>
  <AuthPage
    :description="hasSentEmail
      ? t('auth.forgot_password_form.thank_you_within_a_few')
      : t('auth.forgot_password_form.dont_remember_your_password_enter')"
    :title="t('auth.forgot_password_form.forgot_password')"
  >
    <AppButton
      v-if="hasSentEmail"
      :to="{
        name: Route.LOGIN,
      }"
      class="w-full"
    >
      {{ t('auth.forgot_password_form.return_to_login') }}
    </AppButton>

    <FormElement
      v-else
      :form="form"
    >
      <FormInput
        v-bind="email"
        :label="t('common.email')"
        type="email"
      />

      <FormButton
        :disable-if-not-dirty="false"
        :form="form"
        padding="1.2em"
        class="mt-6 w-full"
      >
        {{ t('auth.forgot_password_form.send') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
