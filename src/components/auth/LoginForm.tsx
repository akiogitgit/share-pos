import { Dispatch, FC, SetStateAction } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

type Props = {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  onSubmit: () => void
}
export const LoginForm: FC<Props> = ({
  email,
  onSubmit,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={(e) => {
          onSubmit()
          e.preventDefault()
        }}
        className='mt-4'
      >
        <div className='relative'>
          <label htmlFor='email' className='font-bold text-sm block '>
            Eメール
          </label>
          <input
            id='email'
            type='text'
            value={email}
            placeholder='email'
            required
            onChange={(v) => setEmail(v.target.value)}
            className='border outline-none p-2 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineMail className='top-33px left-165px absolute' />
        </div>
        <div className='mt-2 relative'>
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
            className='border outline-none p-2 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLine className='top-33px left-165px absolute' />
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
