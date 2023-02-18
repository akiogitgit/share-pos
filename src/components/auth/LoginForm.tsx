import { FC, useState } from 'react'

import { AiOutlineMail as AiOutlineMailIcon } from 'react-icons/ai'
import { RiLockPasswordLine as RiLockPasswordLineIcon } from 'react-icons/ri'
import { Button } from 'components/shares/base/Button'

import { LoginRequestParams } from 'types/auth'

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
      >
        <div className='max-w-300px w-80vw relative'>
          <label>
            Eメール
            <input
              type='text'
              value={email}
              placeholder='example@example.com'
              required
              onChange={v => setEmail(v.target.value)}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
          </label>
          <AiOutlineMailIcon className='top-37px left-270px absolute' />
        </div>
        <div className='mt-2 relative '>
          <label>
            パスワード
            <input
              type='password'
              value={password}
              placeholder='password'
              required
              onChange={v => setPassword(v.target.value)}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
          </label>
          <RiLockPasswordLineIcon className='top-37px left-270px absolute' />
        </div>

        <Button type='submit' fullWidth animate className='mt-4'>
          ログイン
        </Button>
      </form>
    </div>
  )
}
