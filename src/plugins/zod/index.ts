import { z } from 'zod'

import i18n from '../i18n'

export default (): void => {
  const { t } = i18n.global

  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    const isInvalidTypeAndNull = issue.code === z.ZodIssueCode.invalid_type
      && issue.received === 'null'

    const isTooSmallAndString = issue.code === z.ZodIssueCode.too_small
      && issue.minimum === 1 && issue.type === 'string'

    if (isInvalidTypeAndNull || isTooSmallAndString) {
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
