import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'

import { useForm } from 'react-hook-form'
import { AiOutlineMail as AiOutlineMailIcon } from 'react-icons/ai'
import { RiLockPasswordLine as RiLockPasswordLineIcon } from 'react-icons/ri'
import { z } from 'zod'
import { Button } from 'components/shares/base/Button'

type Props = {
  onSubmit: (params: LoginRequestParams) => void
}

const schema = z.object({
  email: z.string().email('メールの形式で入力して下さい'),
  password: z.string().min(6, { message: '6文字以上で入力して下さい' }),
})

export type LoginRequestParams = z.infer<typeof schema>

export const LoginForm: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestParams>({
    resolver: zodResolver(schema),
  })

  return (
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='max-w-300px w-80vw relative'>
          <label>
            Eメール
            <input
              type='text'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              placeholder='example@example.com'
              {...register('email')}
            />
          </label>
          <AiOutlineMailIcon className='top-37px left-270px absolute' />
        </div>
        {errors?.email && (
          <div className='text-danger-dark'>{errors?.email.message}</div>
        )}

        <div className='mt-2 relative '>
          <label>
            パスワード
            <input
              type='password'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              placeholder='password'
              {...register('password')}
            />
          </label>
          <RiLockPasswordLineIcon className='top-37px left-270px absolute' />
          {errors?.password && (
            <div className='text-danger-dark'>{errors?.password.message}</div>
          )}
        </div>
        <Button type='submit' fullWidth animate className='mt-4'>
          ログイン
        </Button>
      </form>
    </div>
  )
}
