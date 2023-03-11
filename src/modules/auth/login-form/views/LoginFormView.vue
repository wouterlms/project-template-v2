<script setup lang="ts">
import { useForm } from '@appwise/forms'

import { useLoginFormService, useLoginFormUtils } from '../composables'

import { useForgotPasswordStore, useLoginStore } from '@/stores'
import { colors } from '@/theme'
import { loginForm } from '@/models'

import { Route } from '@/enums'

const { t } = useI18n()
const router = useRouter()

const loginStore = useLoginStore()
const forgotPasswordStore = useForgotPasswordStore()

const { submitForm } = useLoginFormService({
  onSuccess: async (user) => {
    forgotPasswordStore.setLastLoginAttemptEmail(null)
    loginStore.setLastLoggedInUser(user)

    await router.replace('/')
  },
  onError: (email) => {
    forgotPasswordStore.setLastLoginAttemptEmail(email)
  },
})

const form = useForm(loginForm, {
  onSubmit: submitForm,
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
        :accent-color="colors.accent.primary[500]"
        padding="1.2em"
        class="mt-6 w-full"
      >
        {{ t('common.sign_in') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
