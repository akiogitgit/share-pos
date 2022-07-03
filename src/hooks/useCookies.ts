import { useCookies as useCookiesOriginal } from 'react-cookie'

type Cookies = {
  authInfo: {
    'access-token': string
    client: string
    uid: string
  }
}

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
