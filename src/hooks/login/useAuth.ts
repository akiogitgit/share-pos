import { useCallback } from 'react'
import { BASE_URL, HttpError, postApi } from '../../utils/api'
import { useCookies } from '../useCookies'
import { SignUpRequest } from 'types/user/form'

export const useLogin = () => {
  const { set } = useCookies('authInfo')

  const login = useCallback(
    async (params: { email: string; password: string }) => {
      // ログインの処理
      let result: Response | undefined
      try {
        result = await fetch(`${BASE_URL}/auth/sign_in`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        })

        if (!result.ok) {
          throw new HttpError(result)
        }
      } catch (error) {
        if (error instanceof HttpError) {
          throw error
        }
        console.error(error)
      }
      if (!result) {
        return
      }

      // 型ガード関数
      const isAuthInfoProp = (
        value: string,
      ): value is 'access-token' | 'client' | 'uid' | 'expiry' => {
        return ['access-token', 'client', 'uid', 'expiry'].includes(value)
      }

      // responseのheadersを取得
      let authInfo = { 'access-token': '', client: '', uid: '', expiry: '' }
      for (let pair of result.headers.entries()) {
        if (isAuthInfoProp(pair[0])) {
          authInfo[pair[0]] = pair[1]
        }
      }

      // Cookie に認証情報を格納する
      set('authInfo', authInfo)
      console.log('ログインに成功しました', authInfo)
    },
    [set],
  )
  return { login }
}

export const useSignUp = () => {
  const { login } = useLogin()

  const signUp = useCallback(
    async (signUpRequest: SignUpRequest) => {
      // ユーザー作成に成功したら、そのままログイン
      try {
        const res = await postApi('/auth', signUpRequest)
        if (!res) {
          return
        }
        console.log('ユーザー作成に成功しました', res)

        const { username: _u, ...loginParams } = signUpRequest

        await login(loginParams)
      } catch (e) {
        if (e instanceof HttpError) {
          console.log(HttpError)
        }
      }
    },
    [login],
  )
  return { signUp }
}

export const useLogOut = () => {
  const { remove } = useCookies('authInfo')
  return { logOut: () => remove('authInfo') }
}
