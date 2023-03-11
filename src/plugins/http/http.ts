import axios from 'axios'
import { z } from 'zod'
import type { AxiosRequestConfig } from 'axios'

class InvalidSchemaError extends Error {
  constructor(method: 'get' | 'post' | 'put', url: string, e: z.ZodError) {
    super(`${method.toUpperCase()} ${url} returned an invalid schema. \n\n${e.message}`)
  }
}

export const get = async<T extends z.ZodObject<any> | z.ZodArray<any>>(
  url: string,
  {
    schema,
    config,
  }: {
    schema: T
    config?: Partial<AxiosRequestConfig<any>>
  },
): Promise<z.infer<T>> => {
  const { data } = await axios.get<T>(url, config)

  try {
    return schema.parse(data)
  }
  catch (e) {
    if (e instanceof z.ZodError)
      throw new InvalidSchemaError('get', url, e)

    throw e
  }
}

export const post = async <T extends z.ZodObject<any> | z.ZodArray<any>>(
  url: string,
  {
    data,
    schema,
    config,
  }: {
    data: unknown
    schema: T
    config?: Partial<AxiosRequestConfig<any>>
  },
): Promise<z.infer<T>> => {
  const { data: responseData } = await axios.post<T>(url, data, config)

  try {
    return schema.parse(responseData)
  }
  catch (e) {
    if (e instanceof z.ZodError)
      throw new InvalidSchemaError('post', url, e)

    throw e
  }
}

export const put = async <T extends z.ZodObject<any> | z.ZodArray<any>>(
  url: string,
  {
    data,
    schema,
    config,
  }: {
    data: unknown
    schema: T
    config?: Partial<AxiosRequestConfig<any>>
  },
): Promise<z.infer<T>> => {
  const { data: responseData } = await axios.put<T>(url, data, config)

  try {
    return schema.parse(responseData)
  }
  catch (e) {
    if (e instanceof z.ZodError)
      throw new InvalidSchemaError('put', url, e)

    throw e
  }
}

export const deleteResource = async <T>(
  url: string, config?: Partial<AxiosRequestConfig<any>>,
): Promise<T> => {
  const { data } = await axios.delete<T>(url, config)

  return data
}
