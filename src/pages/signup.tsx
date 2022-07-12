import { NextPage } from 'next'
import { useCallback } from 'react'
import { Layout } from 'components/Layout'
import { SignUpForm } from 'components/SignUpForm'
import { useSignUp } from 'hooks/useAuth'
import { SignUpFormParams } from 'types/user/form'

const SignUp: NextPage = () => {
  const { signUp } = useSignUp()

  const onSubmit = useCallback(
    async (params: SignUpFormParams) => {
      if (params.password != params.passwordConfirmation) {
        console.log('パスワードと確認用パスワードが一致しません。')
        return
      }

      // 確認用パスワードは除いてsignUp渡す
      const { passwordConfirmation: _, ...signUpRequest } = params
      signUp(signUpRequest)
      // マイページに移動する
    },
    [signUp],
  )

  return (
    <Layout title='SharePos ユーザー作成ページ'>
      <div className='m-4'>
        <h1>Sign Up</h1>
        <SignUpForm onSubmit={onSubmit} />
      </div>
    </Layout>
  )
}

export default SignUp
