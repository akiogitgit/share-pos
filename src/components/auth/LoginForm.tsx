import { FC, useState } from 'react'

import { AiOutlineMail as AiOutlineMailIcon } from 'react-icons/ai'
import { RiLockPasswordLine as RiLockPasswordLineIcon } from 'react-icons/ri'

import { LoginRequestParams } from 'types/user/auth'

type Props = {
  onSubmit: (params: LoginRequestParams) => void
}

export const LoginForm: FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('test1@test.com')
  const [password, setPassword] = useState<string>('password')

  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={e => {
          onSubmit({ email, password })
          e.preventDefault()
        }}
        className='mt-4'
      >
        <div className='max-w-300px w-80vw relative'>
          <label htmlFor='email' className='font-bold text-sm block '>
            Eメール
          </label>
          <input
            id='email'
            type='text'
            value={email}
            placeholder='example@example.com'
            required
            onChange={v => setEmail(v.target.value)}
            className='border outline-none w-full p-2 pr-9 ring-secondary duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineMailIcon className='top-33px left-270px absolute' />
        </div>
        <div className='mt-2 relative '>
          <label htmlFor='password' className='font-bold text-sm block'>
            パスワード
          </label>
          <input
            id='password'
            type='password'
            value={password}
            placeholder='password'
            required
            onChange={v => setPassword(v.target.value)}
            className='border outline-none w-full p-2 pr-9 ring-secondary duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLineIcon className='top-33px left-270px absolute' />
        </div>
        <button
          type='submit'
          className='border bg-secondary border-secondary mt-4 text-white w-full p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-secondary) '
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
