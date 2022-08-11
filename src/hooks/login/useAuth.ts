import { useCallback } from 'react'
import { useCookies } from 'stores/useCookies'
import { User } from 'types/user/authInfo'
import { SignUpRequest } from 'types/user/form'
import { HttpError, postApi } from 'utils/api'

export const useLogin = () => {
  const { set } = useCookies('token')

  const login = useCallback(
    async (params: { email: string; password: string }) => {
      try {
        const res = await postApi<User>('/auth/login', params)
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
    async (signUpRequest: SignUpRequest) => {
      // ユーザー作成に成功したら、そのままログイン
      try {
        const res = await postApi<User>('/auth/sign_up', signUpRequest)
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
  const { remove } = useCookies('authInfo')
  return { logOut: () => remove('authInfo') }
}
