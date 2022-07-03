import { useCookies as useCookiesOriginal } from 'react-cookie'
import { AuthInfo } from 'types/authInfo'

type Cookies = AuthInfo

export const useCookies = <
  Key extends keyof Cookies,
  Data extends Cookies[Key],
>(
  key: Key,
) => {
  const [cookies, setCookie, removeCookie] = useCookiesOriginal([key])

  const set = (key: Key, value: Data) => {
    setCookie(key, value)
  }

  const remove = (key: Key) => {
    removeCookie(key)
  }
  return { cookies, set, remove }
}
