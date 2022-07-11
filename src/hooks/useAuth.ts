import { useCallback } from 'react'
import { useGlobalSWR } from '../stores/useGlobalSWR'
import { BASE_URL, HttpError, postApi } from '../utils/api'
import { useCookies } from './useCookies'
import { SignUpRequest } from 'types/user/form'

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

export const doSignUp = async (params: SignUpRequest) => {
  try {
    const res = await postApi('/auth', params)
    return res
  } catch (e) {
    if (e instanceof HttpError) {
      console.log(HttpError)
    }
  }
}

export const useLogin = () => {
  const { mutate: mutateAuthInfo } = useGlobalSWR('authInfo')
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

        // responseのheadersを取得
        for (let pair of res.headers.entries()) {
          if (isAuthInfoProp(pair[0])) {
            authInfo[pair[0]] = pair[1]
          }
        }

        mutateAuthInfo(authInfo)
        set('authInfo', authInfo)
        console.log('ログインに成功しました', authInfo)
      })
    },
    [mutateAuthInfo, set],
  )
  return { login }
}

export const useSignUp = () => {
  const { login } = useLogin()

  const signUp = useCallback(
    async (signUpRequest: SignUpRequest) => {
      // ユーザー作成に成功したら、そのままログイン
      const res = await doSignUp(signUpRequest)
      if (!res) {
        return
      }
      console.log('ユーザー作成に成功しました', res)

      const { username: _u, ...loginParams } = signUpRequest

      login(loginParams)
    },
    [login],
  )
  return { signUp }
}
