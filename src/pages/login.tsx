import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { useLogin } from '../hooks/login/useAuth'
import { Layout } from 'components/shared/Layout'
import { HttpError } from 'utils/api'

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('test1@test.com')
  const [password, setPassword] = useState<string>('password')
  const { login } = useLogin()

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await login({ email, password })
      } catch (error) {
        if (error instanceof HttpError) {
          console.error(error.message)
        }
      }
    },
    [email, login, password],
  )

  return (
    <>
      <Head>
        <title>SharePos ログインページ</title>
      </Head>
      <Layout>
        <div className='flex flex-col items-center justify-center'>
          <div>
            <h1 className='text-center text-lg'>ログイン</h1>

            <form onSubmit={onSubmit} className='mt-4'>
              <div>
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
                  className='border outline-none p-2'
                />
              </div>
              <div className='mt-4'>
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
                  className='border outline-none p-2'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 border-2 border-blue-500 mt-3 text-white w-full p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-blue-500) '
              >
                ログイン
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login
