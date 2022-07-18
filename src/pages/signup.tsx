import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback } from 'react'
import { Layout } from 'components/Layout'
import { SignUpForm } from 'components/SignUpForm'
import { useSignUp } from 'hooks/login/useAuth'
import { SignUpFormParams } from 'types/user/form'
import { HttpError } from 'utils/api'

const SignUp: NextPage = () => {
  const { signUp } = useSignUp()

  const onSubmit = useCallback(
    async (params: SignUpFormParams) => {
      if (params.password !== params.passwordConfirmation) {
        console.log('パスワードと確認用パスワードが一致しません。')
        return
      }

      // 確認用パスワードは除いてsignUp渡す
      const { passwordConfirmation: _, ...signUpRequest } = params
      try {
        await signUp(signUpRequest)
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
        <div>
          <h1>Sign Up</h1>
          <SignUpForm onSubmit={onSubmit} />
        </div>
      </Layout>
    </>
  )
}

export default SignUp
