import { AxiosError } from 'axios'
import type { z } from 'zod'

interface AxiosErrorData {
  message: string
  errors: Record<string, string[]>
}

export default (error: unknown): z.ZodFormattedError<unknown> => {
  if (!(error instanceof AxiosError))
    throw error

  const { response } = error

  if (response == null)
    return {} as unknown as z.ZodFormattedError<unknown>

  const { data } = response as { data: AxiosErrorData }
  const { errors } = data

  const mappedErrors = Object.entries(errors).reduce<z.ZodFormattedError<unknown>>(
    (acc, [key]) => ({
      ...acc,
      [key]: {
        _errors: errors[key],
      },
    }), { _errors: [] },
  )

  return mappedErrors
}
