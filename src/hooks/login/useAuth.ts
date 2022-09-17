import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { LoginRequestParams, SignUpRequestParams } from 'types/user/auth'
import { User } from 'types/user/user'
import { deleteApi, HttpError, postApi } from 'utils/api'

export const useLogin = () => {
  const router = useRouter()

  const login = useCallback(
    async (params: LoginRequestParams) => {
      try {
        const res = await postApi<User>('/auth/login', params)
        if (!res) {
          return
        }

        console.log('ログインに成功しました', res)
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.log(e)
        }
      }
    },
    [router],
  )
  return { login }
}

export const useSignUp = () => {
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
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.log(e)
        }
      }
    },
    [router],
  )
  return { signUp }
}

export const useLogOut = () => {
  const router = useRouter()
  const logout = useCallback(async () => {
    try {
      const res = await deleteApi('/auth/logout')
      console.log('ログアウトしました')
    } catch (e) {
      if (e instanceof HttpError) {
        console.log(e)
      }
    }
  }, [])

  return {
    logOut: () => {
      logout()
      router.push('/')
    },
  }
}
