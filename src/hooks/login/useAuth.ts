import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { LoginRequestParams } from 'components/auth/LoginForm'
import { SignUpRequestParams } from 'components/auth/SignUpForm'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { UserWithToken } from 'types/user'
import { HttpError, postApi } from 'utils/api'
import { encrypted } from 'utils/encrypt'
import { getStatusErrorMessage } from 'utils/getStatusErrorMessage'

export const useLogin = () => {
  const router = useRouter()
  const { set } = useCookies('token')
  const { mutate: mutateUser } = useGetApi('/users/me')

  const login = useCallback(
    async (params: LoginRequestParams) => {
      try {
        const res = await postApi<UserWithToken>('/auth/login', params)

        set('token', encrypted(res.token), { secure: true })
        mutateUser(undefined)

        console.log('ログインに成功しました', res)
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e)
          throw getStatusErrorMessage(e.status, {
            400: 'Eメールかパスワードが正しくありません',
          })
        }
      }
    },
    [mutateUser, router, set],
  )
  return { login }
}

export const useSignUp = () => {
  const router = useRouter()
  const { set } = useCookies('token')
  const { mutate: mutateUser } = useGetApi('/users/me')

  const signUp = useCallback(
    async (params: SignUpRequestParams) => {
      try {
        const res = await postApi<UserWithToken>('/auth/sign_up', params)

        set('token', encrypted(res.token), { secure: true })
        mutateUser(undefined)

        console.log('ユーザー作成に成功しました', res)
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e)
          throw getStatusErrorMessage(e.status, {
            400: 'このEメールは既に使用されています',
          })
        }
      }
    },
    [mutateUser, router, set],
  )
  return { signUp }
}

export const useLogOut = () => {
  const router = useRouter()
  const { remove } = useCookies('token')
  const { mutate: mutateUser } = useGetApi('/users/me')

  return {
    logOut: () => {
      remove('token')
      mutateUser(undefined)

      console.log('logout')
      router.push('/login')
    },
  }
}
