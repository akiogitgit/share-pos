import { useCallback } from 'react'
import { useCookies } from 'stores/useCookies'
import { LoginRequestParams, SignUpRequestParams } from 'types/user/authInfo'
import { User } from 'types/user/user'
import { HttpError, postApi } from 'utils/api'

export const useLogin = () => {
  const { set } = useCookies('token')

  const login = useCallback(
    async (loginRequestParams: LoginRequestParams) => {
      try {
        const res = await postApi<User>('/auth/login', loginRequestParams)
        if (!res) {
          return
        }
        console.log('ログインに成功しました', res)

        set('token', res.token)
      } catch (e) {
        if (e instanceof HttpError) {
          console.log(HttpError)
        }
      }
    },
    [set],
  )
  return { login }
}

export const useSignUp = () => {
  const { set } = useCookies('token')

  const signUp = useCallback(
    async (signUpRequestParams: SignUpRequestParams) => {
      // ユーザー作成に成功したら、そのままログイン
      try {
        const res = await postApi<User>('/auth/sign_up', signUpRequestParams)
        if (!res) {
          return
        }
        console.log('ユーザー作成に成功しました', res)

        set('token', res.token)
      } catch (e) {
        if (e instanceof HttpError) {
          console.log(HttpError)
        }
      }
    },
    [set],
  )
  return { signUp }
}

export const useLogOut = () => {
  const { remove } = useCookies('token')
  return { logOut: () => remove('token') }
}

export const useAuthHeaderParams = () => {
  const { cookies } = useCookies('token')
  return { Authorization: `Token ${cookies.token}` }
}
