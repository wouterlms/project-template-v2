<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { z } from 'zod'

import { useToasts } from '@/composables'
import type { ResetPasswordForm } from '@/models'
import { resetPasswordForm } from '@/models'
import { authService } from '@/services'
import { transformApiErrors } from '@/utils'

const { t } = useI18n()
const { showToastMessage } = useToasts()
const route = useRoute()

const { token } = route.params
const { email } = route.query

const hasPasswordBeenReset = ref<boolean>(false)

const submit = async (
  data: ResetPasswordForm,
): Promise<Nullable<z.ZodFormattedError<ResetPasswordForm>>> => {
  try {
    await authService.resetPassword(data)
    hasPasswordBeenReset.value = true
  }
  catch (err) {
    return transformApiErrors(err)
  }

  return null
}

const form = useForm(resetPasswordForm, {
  onSubmit: submit,
})

if (token == null || email == null)
  showToastMessage(t('auth.reset_password_form.this_is_not_a_valid'))

const description = computed<string>(() => {
  if (hasPasswordBeenReset.value)
    return t('auth.reset_password_form.your_password_has_been_reset_you_can')

  return t('auth.reset_password_form.enter_your_new_password')
})
</script>

<template>
  <AuthPage
    :description="description"
    :title="t('common.reset_password')"
  >
    <FormElement
      v-if="!hasPasswordBeenReset"
      :form="form"
    >
      <FormSpacer>
        <FormInput
          v-bind="form.register('password')"
          :label="t('common.password')"
          type="password"
        />
      </FormSpacer>

      <FormButton
        :form="form"
        class="mt-6 w-full"
        padding="1.2em"
      >
        {{ t('common.reset_password') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
