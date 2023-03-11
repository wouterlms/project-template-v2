<script setup lang="ts">
import { useForm } from '@appwise/forms'
import { useIsMobileDevice } from '@wouterlms/composables'

import { useResetPasswordFormService } from '../composables'

import { useLoginStore } from '@/stores'
import { useAuth, useToasts } from '@/composables'

import { resetPasswordForm } from '@/models'
import { colors } from '@/theme'

const { t } = useI18n()
const { showToastMessage } = useToasts()
const route = useRoute()
const router = useRouter()
const auth = useAuth()

const { token } = route.params
const { email } = route.query

const isMobileDevice = useIsMobileDevice()

const loginStore = useLoginStore()
const isReset = ref(false)

const signInWithNewCredentials = async (email: string, password: string): Promise<void> => {
  await auth.signIn(email, password)
  const user = await auth.getUser()

  loginStore.setLastLoggedInUser(user)

  await router.replace('/')
}

const { submitForm } = useResetPasswordFormService({
  onSuccess: async (email, password) => {
    if (isMobileDevice)
      isReset.value = true
    else
      await signInWithNewCredentials(email, password)
  },
})

const form = useForm(resetPasswordForm, {
  onSubmit: submitForm,
})

if (token == null || email == null)
  showToastMessage(t('auth.reset_password_form.this_is_not_a_valid'))

const description = computed(() => {
  if (isReset.value)
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
      v-if="!isReset"
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
        :accent-color="colors.accent.primary[500]"
        padding="1.2em"
        class="mt-6 w-full"
      >
        {{ t('common.reset_password') }}
      </FormButton>
    </FormElement>
  </AuthPage>
</template>
