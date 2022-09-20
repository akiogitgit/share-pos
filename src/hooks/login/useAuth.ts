import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useCookies } from 'stores/useCookies'
import { LoginRequestParams, SignUpRequestParams } from 'types/user/auth'
import { User } from 'types/user/user'
import { HttpError, postApi } from 'utils/api'
import { encrypted } from 'utils/encrypt'

export const useLogin = () => {
  const router = useRouter()
  const { set } = useCookies('token')

  const login = useCallback(
    async (params: LoginRequestParams) => {
      try {
        const res = await postApi<User>('/auth/login', params)
        if (!res) {
          return
        }

        set('token', encrypted(res.token))
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
  const router = useRouter()
  const { set } = useCookies('token')

  const signUp = useCallback(
    async (params: SignUpRequestParams) => {
      // ユーザー作成に成功したら、そのままログイン
      try {
        const res = await postApi<User>('/auth/sign_up', params)
        if (!res) {
          return
        }

        set('token', encrypted(res.token))
        console.log('ユーザー作成に成功しました', res)
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
  const router = useRouter()
  const { remove } = useCookies('token')

  return {
    logOut: () => {
      remove('token')
      router.push('/')
    },
  }
}
