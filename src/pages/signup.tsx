import { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useLogin } from 'hooks/useLogin'
import { SignUpFormParams, SignUpRequest } from 'types/user/form'
import { HttpError, postApi } from 'utils/api'

const SignUp: NextPage = () => {
  const [signUpFormParams, setSignUpFormParams] = useState<SignUpFormParams>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const { login } = useLogin()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormParams((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  const doSignUp = async (params: SignUpRequest) => {
    try {
      const res = await postApi('/auth', params)
      return res
    } catch (e) {
      if (e instanceof HttpError) {
        console.log(HttpError)
      }
    }
  }

  const signUp = useCallback(
    async (signUpFormParams: SignUpFormParams) => {
      const { passwordConfirmation: _, ...signUpRequest } = signUpFormParams

      const res = await doSignUp(signUpRequest)
      if (!res) {
        return
      }
      console.log('ユーザー作成に成功しました', res)

      // ユーザー作成に成功したら、そのままログイン
      const {
        username: _u,
        passwordConfirmation: _p,
        ...loginParams
      } = signUpFormParams

      login(loginParams)
    },
    [login],
  )

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // passwordの二重チェックする
      if (signUpFormParams.password != signUpFormParams.passwordConfirmation) {
        console.log('パスワードと確認用パスワードが一致しません。')
        return
      }
      signUp(signUpFormParams)
      // マイページに移動する
    },
    [signUp, signUpFormParams],
  )

  return (
    <div className='m-4'>
      <Link href='/'>index</Link>
      <h1>Sign Up</h1>

      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            value={signUpFormParams?.username}
            placeholder='username'
            required
            name='username'
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <div>
          <input
            type='email'
            value={signUpFormParams?.email}
            placeholder='email'
            required
            name='email'
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <div>
          <input
            type='password'
            value={signUpFormParams?.password}
            placeholder='password'
            required
            minLength={6}
            name='password'
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <div>
          <input
            type='password'
            value={signUpFormParams?.passwordConfirmation}
            placeholder='確認用パスワード'
            required
            minLength={6}
            name='passwordConfirmation'
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <button
          type='submit'
          className='font-serif bg-blue-500 border-2 border-blue-500 mt-3 text-white p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-blue-500) '
        >
          ユーザー作成
        </button>
      </form>
    </div>
  )
}

export default SignUp
