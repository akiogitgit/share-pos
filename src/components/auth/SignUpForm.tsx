import { FC, useState } from 'react'

import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
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
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={(e) => {
          onSubmit(signUpFormParams)
          e.preventDefault()
        }}
      >
        <div className='relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            ユーザー名
          </label>
          <input
            type='text'
            value={signUpFormParams.username}
            placeholder='username'
            required
            name='username'
            onChange={(e) => onChange(e)}
            className='border outline-none p-2 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineUser className='top-33px left-165px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label htmlFor='email' className='font-bold text-sm block '>
            Eメール
          </label>
          <input
            type='email'
            id='email'
            value={signUpFormParams.email}
            placeholder='email'
            required
            name='email'
            onChange={(e) => onChange(e)}
            className='border outline-none p-2 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineMail className='top-33px left-165px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label htmlFor='password' className='font-bold text-sm block '>
            パスワード
          </label>
          <input
            type='password'
            id='password'
            value={signUpFormParams.password}
            placeholder='password'
            required
            minLength={6}
            name='password'
            onChange={(e) => onChange(e)}
            className='border outline-none p-2 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLine className='top-33px left-165px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label
            htmlFor='passwordConfirmation'
            className='font-bold text-sm block '
          >
            確認用パスワード
          </label>
          <input
            type='password'
            id='passwordConfirmation'
            value={signUpFormParams.passwordConfirmation}
            placeholder='確認用パスワード'
            required
            minLength={6}
            name='passwordConfirmation'
            onChange={(e) => onChange(e)}
            className='border outline-none p-2 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLine className='top-33px left-165px absolute' />
        </div>
        <button
          type='submit'
          className='border bg-blue-500 border-blue-500 mt-4 text-white w-full py-1 duration-300 hover:(bg-white text-blue-500) '
        >
          ユーザー作成
        </button>
      </form>
    </div>
  )
}
