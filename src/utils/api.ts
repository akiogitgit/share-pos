import { Cookies } from 'react-cookie'
import { decrypted } from './encrypt'
import { isEmptyObj } from './isEmptyObj'
import { toCamelCaseObj } from './toCamelCaseObj'
import { Res } from 'types/response'

// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
// export const BASE_URL = 'http://localhost:3001/api/v1'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL2

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class HttpError extends Error {
  url: string
  status: number
  message: string
  constructor(response: Response, resJson?: Res<any>) {
    super()
    this.name = 'HttpError'
    this.url = response.url
    this.status = response.status
    this.message = resJson?.message || ''
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
  const cookie = new Cookies()

  // 暗号化されたtokenをCookieから取得して複合化してheaderに格納
  // 以前はtokenをRailsがCookieにセットしていたが、端末がスマホだとセットされない。
  // 代わりにfetchApiを使うたびに、headerにtokenを手動で入れた
  if (cookie.get('token')) {
    const token = decrypted(cookie.get('token'))
    requestHeaders['Authorization'] = `Token ${token}`
  }

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

  let result: Res<object> | undefined
  try {
    const res = await fetch(encodeURI(`${BASE_URL}${requestUrl}`), {
      method,
      body: isEmptyObj(requestParams)
        ? undefined
        : JSON.stringify(requestParams),
      headers: { ...requestHeaders },
    })

    if (!res.ok) {
      const json = (await res.json()) as Res<any>
      throw new HttpError(res, json)
    }
    result = await res.json()
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
    console.error(error)
  }

  return (result ? toCamelCaseObj(result).data : result) as unknown as T
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
