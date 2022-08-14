import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useCookies } from 'stores/useCookies'
import { LoginRequestParams, SignUpRequestParams } from 'types/user/auth'
import { User } from 'types/user/user'
import { HttpError, postApi } from 'utils/api'

export const useLogin = () => {
  const { set } = useCookies(['token', 'userInfo'])
  const router = useRouter()

  const login = useCallback(
    async (params: LoginRequestParams) => {
      try {
        const res = await postApi<User>('/auth/login', params)
        if (!res) {
          return
        }

        set('token', res.token)
        set('userInfo', { id: res.id, username: res.username })
        console.log('ログインに成功しました', res)
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.log(e)
        }
      }
    },
    [router, set],
  )
  return { login }
}

export const useSignUp = () => {
  const { set } = useCookies(['token', 'userInfo'])
  const router = useRouter()

  const signUp = useCallback(
    async (params: SignUpRequestParams) => {
      // ユーザー作成に成功したら、そのままログイン
      try {
        const res = await postApi<User>('/auth/sign_up', params)
        if (!res) {
          return
        }
        console.log('ユーザー作成に成功しました', res)

        set('token', res.token)
        set('userInfo', { id: res.id, username: res.username })
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.log(e)
        }
      }
    },
    [router, set],
  )
  return { signUp }
}

export const useLogOut = () => {
  const { remove } = useCookies(['token', 'userInfo'])
  return {
    logOut: () => {
      remove('token')
      remove('userInfo')
    },
  }
}

export const useAuthHeaderParams = () => {
  const { cookies } = useCookies('token')
  return { Authorization: `Token ${cookies.token}` }
}
