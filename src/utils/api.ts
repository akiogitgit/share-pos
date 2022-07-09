import { isEmptyObj } from './isEmptyObj'
import { toCamelCaseObj } from './toCamelCaseObj'

export const BASE_URL = 'https://share-pos.herokuapp.com/api/v1'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class HttpError extends Error {
  url: string
  status: number
  message: string
  constructor(response: Response) {
    super()
    this.name = 'HttpError'
    this.url = response.url
    this.status = response.status
    this.message = response.statusText
  }
}

export const fetchApi = async <T>(
  url: string,
  method: Method,
  params?: Record<string, any>,
  headers?: Record<string, string>,
): Promise<T> => {
  let requestUrl = url
  let requestParams = { ...params }
  let requestHeaders = headers || {}

  if (method === 'GET') {
    // /example/1 -> /example/1?searchWord="あああ"
    if (!isEmptyObj(requestParams)) {
      requestUrl += `?${Object.entries(requestParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
      requestParams = {}
    }
  }

  if (!isEmptyObj(requestParams)) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  let result: object | undefined
  try {
    const res = await fetch(encodeURI(`${BASE_URL}${requestUrl}`), {
      method,
      body: isEmptyObj(requestParams)
        ? undefined
        : JSON.stringify(requestParams),
      headers: { ...requestHeaders },
    })

    if (!res.ok) {
      throw new HttpError(res)
    }
    result = await res.json()
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
    console.error(error)
  }

  return (result ? toCamelCaseObj(result) : result) as unknown as T
}

export const getApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'GET', params, headers)

export const postApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'POST', params, headers)

export const putApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'PUT', params, headers)

export const deleteApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<undefined>(url, 'DELETE', params, headers)
