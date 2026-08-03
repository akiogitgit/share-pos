import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { SignUpForm, SignUpRequestParams } from 'components/auth/SignUpForm'
import { Layout } from 'components/layout/Layout'
import { Alert } from 'components/shares/base/Alert'
import { useSignUp } from 'hooks/login/useAuth'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'

const SignUp: NextPage = () => {
  const { signUp } = useSignUp()
  const { onSubmit, errorMessage, clearErrorMessage } = useFormErrorHandling<
    SignUpRequestParams
  >(signUp)

  return (
    <>
      <Head>
        <title>SharePos 新規登録ページ</title>
      </Head>
      <Layout>
        <h1 className='font-bold text-center text-xl'>新規登録</h1>

        <div className='my-6'>
          {errorMessage && (
            <Alert className='mx-auto max-w-300px' onClose={clearErrorMessage}>
              {errorMessage}
            </Alert>
          )}
        </div>
        <SignUpForm onSubmit={onSubmit} />

        <p className='mt-4 text-center'>
          ログインは
          <Link
            href='/login'
            className='font-bold text-accent-dark'
            aria-label='ログイン'
          >
            こちら
          </Link>
        </p>
      </Layout>
    </>
  )
}

export default SignUp
