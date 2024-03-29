import { useCallback } from 'react'
import { useCookies as useCookiesOriginal } from 'react-cookie'

type Cookies = {
  token: string
}

// 1つだけなら useCookies("token")
// 2つ以上なら useCookies(["token","user_info"])
export const useCookies = <
  Key extends keyof Cookies,
  Data extends Cookies[Key],
>(
  key: Key | Key[],
) => {
  const params = typeof key === 'string' ? [key] : [...key]
  const [cookies, setCookie, removeCookie] = useCookiesOriginal(params)

  const set = useCallback(
    (
      key: Key,
      value: Data,
      options?: {
        path?: string
        expires?: Date
        maxAge?: number
        domain?: string
        secure?: boolean
        httpOnly?: boolean
      },
    ) => {
      setCookie(key, value, options)
    },
    [setCookie],
  )

  const remove = useCallback(
    (key: Key | Key[]) => {
      if (typeof key === 'string') {
        removeCookie(key)
        return
      }
      key.forEach((v) => {
        return removeCookie(v)
      })
    },
    [removeCookie],
  )
  return { cookies, set, remove }
}
