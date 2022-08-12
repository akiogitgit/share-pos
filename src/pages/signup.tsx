import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback } from 'react'
import { SignUpForm } from 'components/auth/SignUpForm'
import { Layout } from 'components/shared/Layout'
import { useSignUp } from 'hooks/login/useAuth'
import { SignUpRequestParams } from 'types/user/auth'
import { HttpError } from 'utils/api'

const SignUp: NextPage = () => {
  const { signUp } = useSignUp()

  const onSubmit = useCallback(
    async (params: SignUpRequestParams) => {
      if (params.password !== params.passwordConfirmation) {
        console.log('パスワードと確認用パスワードが一致しません。')
        return
      }

      try {
        await signUp(params)
      } catch (error) {
        if (error instanceof HttpError) {
          console.error(error)
        }
      }
      // マイページに移動する
    },
    [signUp],
  )

  return (
    <>
      <Head>
        <title>SharePos 新規登録ページ</title>
      </Head>
      <Layout>
        <h1 className='text-center text-lg'>新規登録</h1>
        <div className='mt-4'>
          <SignUpForm onSubmit={onSubmit} />
        </div>
      </Layout>
    </>
  )
}

export default SignUp
