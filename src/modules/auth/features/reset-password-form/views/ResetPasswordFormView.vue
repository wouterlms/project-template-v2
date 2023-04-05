<script setup lang="ts">
import { useForm } from '@appwise/forms'
import type { z } from 'zod'

import { authService } from '../../../services'
import { mapResetPasswordFormToDto } from '../utils'

import { useToasts } from '@/composables'
import { transformApiErrors } from '@/utils'

import { resetPasswordForm } from '@/models'
import type { ResetPasswordForm } from '@/models'

const { t } = useI18n()
const { showToastMessage } = useToasts()
const route = useRoute()

const { token } = route.params
const { email } = route.query

const hasPasswordBeenReset = ref<boolean>(false)

const submit = async (
  data: ResetPasswordForm,
): Promise<z.ZodFormattedError<ResetPasswordForm> | void> => {
  try {
    await authService.resetPassword(mapResetPasswordFormToDto(data))
    hasPasswordBeenReset.value = true
  }
  catch (err) {
    return transformApiErrors(err)
  }
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
    :title="t('common.reset_password')"
    :description="description"
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
        padding="1.2em"
        class="mt-6 w-full"
      >
        {{ t('common.reset_password') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
