import { FC, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
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
        onSubmit={(e) => {
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
            onChange={(v) => setEmail(v.target.value)}
            className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineMail className='top-33px left-270px absolute' />
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
            onChange={(v) => setPassword(v.target.value)}
            className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLine className='top-33px left-270px absolute' />
        </div>
        <button
          type='submit'
          className='border bg-blue-500 border-blue-500 mt-4 text-white w-full p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-blue-500) '
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
