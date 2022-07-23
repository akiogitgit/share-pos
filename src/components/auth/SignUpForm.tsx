import { FC, useState } from 'react'
import { SignUpFormParams } from 'types/user/form'

type Props = {
  onSubmit: (params: SignUpFormParams) => void
}

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const [signUpFormParams, setSignUpFormParams] = useState<SignUpFormParams>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormParams((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <form
      onSubmit={(e) => {
        onSubmit(signUpFormParams)
        e.preventDefault()
      }}
    >
      <div>
        <input
          type='text'
          value={signUpFormParams?.username}
          placeholder='username'
          required
          name='username'
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
  )
}
