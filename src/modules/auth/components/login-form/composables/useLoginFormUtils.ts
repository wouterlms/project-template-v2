import { useLoginStore } from '../../../stores'

type UseLoginFormUtils = () => {
  title: string
}

const useLoginFormUtils: UseLoginFormUtils = () => {
  const { t } = useI18n()
  const loginStore = useLoginStore()

  const { lastLoggedInUser } = loginStore

  const title = lastLoggedInUser === null
    ? t('common.sign_in')
    : t('auth.login_form.welcome_back', { name: lastLoggedInUser.firstName })

  return {
    title,
  }
}

export default useLoginFormUtils
