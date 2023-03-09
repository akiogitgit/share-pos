import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { RxCross2 as RxCross2Icon } from 'react-icons/rx'
import { SignUpForm, SignUpRequestParams } from 'components/auth/SignUpForm'
import { Layout } from 'components/layout/Layout'
import { useSignUp } from 'hooks/login/useAuth'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'

const SignUp: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const { signUp } = useSignUp()
  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<SignUpRequestParams>(signUp)

  return (
    <>
      <Head>
        <title>SharePos 新規登録ページ</title>
      </Head>
      <Layout>
        <h1 className='font-bold text-center text-xl'>新規登録</h1>

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
        <SignUpForm onSubmit={onSubmit} />

        <p className='mt-4 text-center'>
          ログインは
          <Link href='/login'>
            <span className='font-bold text-accent-dark'>こちら</span>
          </Link>
        </p>
      </Layout>
    </>
  )
}

export default SignUp
