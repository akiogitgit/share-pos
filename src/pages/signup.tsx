import { NextPage } from 'next'
import Link from 'next/link'
import { useCallback } from 'react'
import { SignUpForm } from 'components/signUpForm'
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
      signUp(params)
      // マイページに移動する
    },
    [signUp],
  )

  return (
    <div className='m-4'>
      <Link href='/'>index</Link>
      <h1>Sign Up</h1>
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}

export default SignUp
