import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { LoginRequestParams, SignUpRequestParams } from 'types/user/auth'
import { UserWithToken } from 'types/user/user'
import { HttpError, postApi } from 'utils/api'
import { encrypted } from 'utils/encrypt'

export const useLogin = () => {
  const router = useRouter()
  const { set } = useCookies('token')

  const login = useCallback(
    async (params: LoginRequestParams) => {
      try {
        const res = await postApi<UserWithToken>('/auth/login', params)
        if (!res) {
          return
        }

        set('token', encrypted(res.token), { secure: true })
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
        const res = await postApi<UserWithToken>('/auth/sign_up', params)
        if (!res) {
          return
        }

        set('token', encrypted(res.token), { secure: true })
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
  const { data, mutate } = useGetApi('/users/me')

  return {
    logOut: () => {
      mutate(undefined, false)
      remove('token')
      console.log('logout')
      router.push('/login')
    },
  }
}
