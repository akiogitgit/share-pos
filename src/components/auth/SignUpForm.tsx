import { FC, useCallback, useState } from 'react'

import {
  AiOutlineMail as AiOutlineMailIcon,
  AiOutlineUser as AiOutlineUserIcon,
} from 'react-icons/ai'
import { RiLockPasswordLine as RiLockPasswordLineIcon } from 'react-icons/ri'
import { Button } from 'components/shares/base/Button'

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
        className='max-w-300px w-80vw'
      >
        <div className='relative'>
          <label>
            ユーザー名
            <input
              type='text'
              value={formParams.username}
              placeholder='シェアポス太郎'
              required
              name='username'
              onChange={e => onChange(e)}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
          </label>
          <AiOutlineUserIcon className='top-37px left-270px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label>
            Eメール
            <input
              type='email'
              id='email'
              value={formParams.email}
              placeholder='example@example.com'
              required
              name='email'
              onChange={e => onChange(e)}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
          </label>
          <AiOutlineMailIcon className='top-37px left-270px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label>
            パスワード
            <input
              type='password'
              id='password'
              value={formParams.password}
              placeholder='password'
              required
              minLength={6}
              name='password'
              onChange={e => onChange(e)}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
          </label>
          <RiLockPasswordLineIcon className='top-37px left-270px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label>
            確認用パスワード
            <input
              type='password'
              id='passwordConfirmation'
              value={formParams.passwordConfirmation}
              required
              minLength={6}
              placeholder='password'
              name='passwordConfirmation'
              onChange={e => onChange(e)}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
          </label>
          <RiLockPasswordLineIcon className='top-37px left-270px absolute' />
        </div>
        <Button type='submit' fullWidth className='mt-4' animate>
          登録
        </Button>
      </form>
    </div>
  )
}
