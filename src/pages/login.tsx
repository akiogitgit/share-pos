import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react'

import { useLogin } from '../hooks/login/useAuth'
import { LoginForm } from 'components/auth/LoginForm'
import { Layout } from 'components/shared/Layout'
import { HttpError } from 'utils/api'

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('test1@test.com')
  const [password, setPassword] = useState<string>('password')
  const { login } = useLogin()

  const onSubmit = useCallback(async () => {
    try {
      await login({ email, password })
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message)
      }
    }
  }, [email, login, password])

  return (
    <>
      <Head>
        <title>SharePos ログインページ</title>
      </Head>
      <Layout>
        <h1 className='text-center text-lg'>ログイン</h1>
        <LoginForm
          email={email}
          setEmail={setEmail}
          onSubmit={onSubmit}
          password={password}
          setPassword={setPassword}
        />
      </Layout>
    </>
  )
}

export default Login
