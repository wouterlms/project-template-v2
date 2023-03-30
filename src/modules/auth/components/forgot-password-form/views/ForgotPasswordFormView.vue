<script setup lang="ts">
import { useForm } from '@appwise/forms'

import { useForgotPasswordFormService } from '../composables'

import { useForgotPasswordStore } from '../../../stores'
import { forgotPasswordForm } from '@/models'

import { Route } from '@/enums'

const { t } = useI18n()

const forgotPasswordStore = useForgotPasswordStore()

const { lastLoginAttemptEmail } = forgotPasswordStore

const hasSentEmail = computed<boolean>(() => forgotPasswordStore.hasSentEmail)

const { submitForm } = useForgotPasswordFormService({
  onSuccess: () => {
    forgotPasswordStore.setHasSentEmail(true)
  },
})

const form = useForm(forgotPasswordForm, {
  onSubmit: submitForm,
})

const email = form.register('email', lastLoginAttemptEmail ?? undefined)

onBeforeUnmount(() => {
  forgotPasswordStore.setHasSentEmail(false)
})
</script>

<template>
  <AuthPage
    :title="t('auth.forgot_password_form.forgot_password')"
    :description="hasSentEmail
      ? t('auth.forgot_password_form.thank_you_within_a_few')
      : t('auth.forgot_password_form.dont_remember_your_password_enter')"
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
        :form="form"
        :disable-if-not-dirty="false"
        padding="1.2em"
        class="mt-6 w-full"
      >
        {{ t('auth.forgot_password_form.send') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
