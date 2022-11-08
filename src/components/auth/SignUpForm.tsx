import { FC, useCallback, useState } from 'react'

import {
  AiOutlineMail as AiOutlineMailIcon,
  AiOutlineUser as AiOutlineUserIcon,
} from 'react-icons/ai'
import { RiLockPasswordLine as RiLockPasswordLineIcon } from 'react-icons/ri'
import { Button } from 'components/shares/Button'

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
    setFormParams(state => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }, [])

  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={e => {
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
            onChange={e => onChange(e)}
            className='border outline-none ring-secondary w-full p-2 pr-9 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineUserIcon className='top-33px left-270px absolute' />
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
            onChange={e => onChange(e)}
            className='border outline-none ring-secondary w-full p-2 pr-9 duration-300 focus:rounded-10px focus:ring-1'
          />
          <AiOutlineMailIcon className='top-33px left-270px absolute' />
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
            onChange={e => onChange(e)}
            className='border outline-none ring-secondary w-full p-2 pr-9 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLineIcon className='top-33px left-270px absolute' />
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
            onChange={e => onChange(e)}
            className='border outline-none ring-secondary w-full p-2 pr-9 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiLockPasswordLineIcon className='top-33px left-270px absolute' />
        </div>
        <Button type='submit' color='blue' fullWidth className='mt-4' animate>
          登録
        </Button>
      </form>
    </div>
  )
}
