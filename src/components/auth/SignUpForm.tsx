import { FC, useCallback, useState } from 'react'

import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { SignUpRequestParams } from 'types/user/auth'

type Props = {
  onSubmit: (params: SignUpRequestParams) => void
}

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const [formParams, setFormParams] = useState<SignUpRequestParams>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormParams((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }, [])

  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={(e) => {
          onSubmit(formParams)
          e.preventDefault()
        }}
      >
        <div className='max-w-300px w-80vw relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            ユーザー名
          </label>
          <input
            type='text'
            value={formParams.username}
            placeholder='シェアポス太郎'
            required
            name='username'
            onChange={(e) => onChange(e)}
            className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineUser className='top-33px left-270px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label htmlFor='email' className='font-bold text-sm block '>
            Eメール
          </label>
          <input
            type='email'
            id='email'
            value={formParams.email}
            placeholder='example@example.com'
            required
            name='email'
            onChange={(e) => onChange(e)}
            className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineMail className='top-33px left-270px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label htmlFor='password' className='font-bold text-sm block '>
            パスワード
          </label>
          <input
            type='password'
            id='password'
            value={formParams.password}
            placeholder='password'
            required
            minLength={6}
            name='password'
            onChange={(e) => onChange(e)}
            className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLine className='top-33px left-270px absolute' />
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
            value={formParams.passwordConfirmation}
            required
            minLength={6}
            placeholder='password'
            name='passwordConfirmation'
            onChange={(e) => onChange(e)}
            className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLine className='top-33px left-270px absolute' />
        </div>
        <button
          type='submit'
          className='border bg-blue-500 border-blue-500 mt-4 text-white w-full py-1 duration-300 hover:(bg-white text-blue-500) '
        >
          登録
        </button>
      </form>
    </div>
  )
}
