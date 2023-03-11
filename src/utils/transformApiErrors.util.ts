import { AxiosError } from 'axios'
import type { z } from 'zod'

interface AxiosErrorData {
  message: string
  errors: Record<string, string[]>
}

export default (error: unknown): Omit<z.ZodFormattedError<any>, '_errors'> => {
  if (!(error instanceof AxiosError))
    throw error

  const { response } = error

  if (response == null)
    return {}

  const { data } = response
  const { errors } = data as AxiosErrorData

  const mappedErrors = Object.entries(errors).reduce((acc, [key]) => ({
    ...acc,
    [key]: {
      _errors: errors[key],
    },
  }), {})

  return mappedErrors
}
