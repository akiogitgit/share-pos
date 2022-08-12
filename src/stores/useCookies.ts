import { useCallback } from 'react'
import { useCookies as useCookiesOriginal } from 'react-cookie'

type Cookies = {
  token: string
  userInfo: {
    id: number
    username: string
  }
}

// 1つだけなら useCookies("token")
// 2つ以上なら useCookies(["token","userInfo"])
export const useCookies = <
  Key extends keyof Cookies,
  Data extends Cookies[Key],
>(
  key: Key | Key[],
) => {
  const params = typeof key === 'string' ? [key] : [...key]
  const [cookies, setCookie, removeCookie] = useCookiesOriginal(params)

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
