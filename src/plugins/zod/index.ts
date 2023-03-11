import { z } from 'zod'
import i18n from '../i18n'

export default (): void => {
  const { t } = i18n.global

  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type && issue.received === 'null') {
      return {
        message: t('validation.required'),
      }
    }

    if (issue.code === z.ZodIssueCode.too_small && issue.minimum === 1 && issue.type === 'string') {
      return {
        message: t('validation.required'),
      }
    }

    return {
      message: ctx.defaultError,
    }
  }

  z.setErrorMap(customErrorMap)
}
