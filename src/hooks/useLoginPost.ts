import { useCallback } from 'react'
import { useCookies } from './useCookies'
import { useGlobalSWR } from 'stores/useGlobalSWR'
import { BASE_URL, HttpError } from 'utils/api'

export const doLogin = async (params: any) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/sign_in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    if (!res.ok) {
      throw new HttpError(res)
    }
    return res as Response
  } catch (error) {
    if (error instanceof HttpError) {
      throw error
    }
    console.error(error)
  }
}

export const useLogin = () => {
  const { mutate: mutateToken } = useGlobalSWR('authInfo')
  const { set } = useCookies('authInfo')

  const login = useCallback(
    async (params: { email: string; password: string }) => {
      await doLogin(params).then((res) => {
        if (!res) {
          return
        }
        let authInfo = { 'access-token': '', client: '', uid: '' }

        // 型ガード関数
        const isAuthInfoProp = (
          value: string,
        ): value is 'access-token' | 'client' | 'uid' => {
          return ['access-token', 'client', 'uid'].includes(value)
        }

        for (let pair of res.headers.entries()) {
          if (isAuthInfoProp(pair[0])) {
            authInfo[pair[0]] = pair[1]
          }
        }

        set('authInfo', authInfo)
        console.log(authInfo)
        mutateToken(authInfo)
      })
    },
    [mutateToken, set],
  )

  return { login }
}
