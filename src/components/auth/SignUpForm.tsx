import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'

import { useForm } from 'react-hook-form'
import {
  AiOutlineMail as AiOutlineMailIcon,
  AiOutlineUser as AiOutlineUserIcon,
} from 'react-icons/ai'
import { RiLockPasswordLine as RiLockPasswordLineIcon } from 'react-icons/ri'
import { z } from 'zod'
import { Button } from 'components/shares/base/Button'

type Props = {
  onSubmit: (params: SignUpRequestParams) => void
}

const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: '入力は必須です' })
      .max(30, { message: '30文字以下で入力して下さい' }),
    email: z.string().email('メールの形式で入力して下さい'),
    password: z.string().min(6, { message: '6文字以上で入力して下さい' }),
    passwordConfirmation: z.string(),
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.passwordConfirmation) {
      ctx.addIssue({
        path: ['passwordConfirmation'],
        code: 'custom',
        message: '確認用パスワードが一致しません',
      })
    }
  })

export type SignUpRequestParams = z.infer<typeof schema>

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequestParams>({ resolver: zodResolver(schema) })

  return (
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-300px w-80vw'>
        <div className='relative'>
          <label>
            ユーザー名
            <input
              type='text'
              placeholder='シェアポス太郎'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              {...register('username')}
              aria-required='true'
              aria-invalid={!!errors?.username}
            />
          </label>
          <AiOutlineUserIcon className='top-37px left-270px absolute' />
          {errors?.username && (
            <p role='alert' className='text-danger-dark'>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className='mt-2 relative'>
          <label>
            Eメール
            <input
              type='email'
              placeholder='example@example.com'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              {...register('email')}
              aria-required='true'
              aria-invalid={!!errors?.email}
            />
          </label>
          <AiOutlineMailIcon className='top-37px left-270px absolute' />
          {errors?.email && (
            <p role='alert' className='text-danger-dark'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='mt-2 relative'>
          <label>
            パスワード
            <input
              type='password'
              placeholder='password'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              {...register('password')}
              aria-required='true'
              aria-invalid={!!errors?.password}
            />
          </label>
          <RiLockPasswordLineIcon className='top-37px left-270px absolute' />
          {errors?.password && (
            <p role='alert' className='text-danger-dark'>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className='mt-2 relative'>
          <label>
            確認用パスワード
            <input
              type='password'
              placeholder='password'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              {...register('passwordConfirmation')}
              aria-required='true'
              aria-invalid={!!errors?.passwordConfirmation}
            />
          </label>
          <RiLockPasswordLineIcon className='top-37px left-270px absolute' />
          {errors?.passwordConfirmation && (
            <p role='alert' className='text-danger-dark'>
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>
        <Button type='submit' fullWidth className='mt-4' animate>
          登録
        </Button>
      </form>
    </div>
  )
}
