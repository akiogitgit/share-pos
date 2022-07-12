import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useLogin } from '../hooks/useAuth'
import { Layout } from 'components/Layout'

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('test1@test.com')
  const [password, setPassword] = useState<string>('password')
  const { login } = useLogin()

  // form要素の時 async await が使用できない
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      login({ email, password })
      e.preventDefault()
    },
    [email, login, password],
  )

  return (
    <Layout title='SharePos ログインページ'>
      <div className='m-4'>
        <h1>Login</h1>

        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              value={email}
              placeholder='email'
              required
              onChange={(v) => setEmail(v.target.value)}
              className='border-black outline-none border-b-2 p-2'
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              placeholder='password'
              required
              onChange={(v) => setPassword(v.target.value)}
              className='border-black outline-none border-b-2 p-2'
            />
          </div>
          <button
            type='submit'
            className='font-serif bg-blue-500 border-2 border-blue-500 mt-3 text-white p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-blue-500) '
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
