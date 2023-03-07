import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { RxCross2 as RxCross2Icon } from 'react-icons/rx'
import { useLogin } from '../hooks/login/useAuth'
import { LoginForm, LoginRequestParams } from 'components/auth/LoginForm'
import { Layout } from 'components/layout/Layout'

const Login: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const { login } = useLogin()

  const onSubmit = useCallback(
    async (params: LoginRequestParams) => {
      try {
        await login(params)
      } catch (error) {
        if (typeof error === 'string') {
          setErrorMessage(error)
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
        <h1 className='font-bold text-center text-xl'>ログイン</h1>

        <div className='my-6'>
          {errorMessage && (
            <div className='bg-danger-light flex mx-auto text-danger-dark max-w-300px py-3 px-3 justify-between items-center'>
              <div>{errorMessage}</div>
              <RxCross2Icon
                className='cursor-pointer text-danger-dark ml-2 min-h-5 min-w-5'
                onClick={() => setErrorMessage('')}
              />
            </div>
          )}
        </div>

        <LoginForm onSubmit={onSubmit} />

        <p className='mt-4 text-center'>
          新規登録は
          <Link href='/signup'>
            <span className='font-bold text-accent-dark'>こちら</span>
          </Link>
        </p>
      </Layout>
    </>
  )
}

export default Login
