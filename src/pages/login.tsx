import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { LoginForm, LoginRequestParams } from 'components/auth/LoginForm'
import { Layout } from 'components/layout/Layout'
import { Alert } from 'components/shares/base/Alert'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'

import { useLogin } from '../hooks/login/useAuth'

const Login: NextPage = () => {
  const { login } = useLogin()
  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<LoginRequestParams>(login)

  return (
    <>
      <Head>
        <title>SharePos ログインページ</title>
      </Head>
      <Layout>
        <h1 className='font-bold text-center text-xl'>ログイン</h1>

        <div className='my-6'>
          {errorMessage && (
            <Alert className='mx-auto max-w-300px' onClose={clearErrorMessage}>
              {errorMessage}
            </Alert>
          )}
        </div>

        <LoginForm onSubmit={onSubmit} />

        <p className='mt-4 text-center'>
          新規登録は
          <Link
            href='/signup'
            className='font-bold text-accent-dark'
            aria-label='新規登録'
          >
            こちら
          </Link>
        </p>
      </Layout>
    </>
  )
}

export default Login
