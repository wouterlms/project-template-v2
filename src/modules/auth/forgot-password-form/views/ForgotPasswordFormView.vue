<script setup lang="ts">
import { useForm } from '@appwise/forms'

import { useForgotPasswordFormService } from '../composables'

import { useForgotPasswordStore } from '@/stores'
import { forgotPasswordForm } from '@/models'
import { colors } from '@/theme'

import { Route } from '@/enums'

const { t } = useI18n()

const forgotPasswordStore = useForgotPasswordStore()

const { submitForm } = useForgotPasswordFormService({
  onSuccess: () => {
    forgotPasswordStore.setHasSentEmail(true)
  },
})

const form = useForm(forgotPasswordForm, {
  onSubmit: submitForm,
})

onBeforeUnmount(() => {
  forgotPasswordStore.setHasSentEmail(false)
})

const hasSentEmail = computed(() => forgotPasswordStore.hasSentEmail)
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
        v-bind=" form.register('email')"
        :label="t('common.email')"
        type="email"
      />

      <FormButton
        :form="form"
        :accent-color="colors.accent.primary[500]"
        padding="1.2em"
        class="mt-6 w-full"
      >
        {{ t('auth.forgot_password_form.send') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
