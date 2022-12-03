import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback } from 'react'

import { useLogin } from '../hooks/login/useAuth'
import { LoginForm } from 'components/auth/LoginForm'
import { Layout } from 'components/layout/Layout'
import { LoginRequestParams } from 'types/user/auth'
import { HttpError } from 'utils/api'

const Login: NextPage = () => {
  const { login } = useLogin()

  const onSubmit = useCallback(
    async (params: LoginRequestParams) => {
      try {
        await login(params)
      } catch (error) {
        if (error instanceof HttpError) {
          console.error(error.message)
        }
      }
    },
    [login],
  )

  return (
    <>
      <Head>
        <title>SharePos ログインページ</title>
      </Head>
      <Layout>
        <h1 className='text-center text-lg'>ログイン</h1>
        <LoginForm onSubmit={onSubmit} />

        <p className='mt-4 text-center'>
          新規登録は
          <Link href='/signup'>
            <span className='font-bold text-secondary'>こちら</span>
          </Link>
        </p>
      </Layout>
    </>
  )
}

export default Login
