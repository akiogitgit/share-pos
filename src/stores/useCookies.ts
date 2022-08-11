import { useCallback } from 'react'
import { useCookies as useCookiesOriginal } from 'react-cookie'
import { AuthInfo } from 'types/user/authInfo'

type Cookies = {
  authInfo: AuthInfo
  token: string
}

export const useCookies = <
  Key extends keyof Cookies,
  Data extends Cookies[Key],
>(
  key: Key,
) => {
  const [cookies, setCookie, removeCookie] = useCookiesOriginal([key])

  const set = useCallback(
    (key: Key, value: Data) => {
      setCookie(key, value)
    },
    [setCookie],
  )

  const remove = useCallback(
    (key: Key) => {
      removeCookie(key)
    },
    [removeCookie],
  )
  return { cookies, set, remove }
}
