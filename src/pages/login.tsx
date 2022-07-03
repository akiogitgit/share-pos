import { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useGlobalSWR } from './../stores/useGlobalSWR'
import { useCookies } from 'hooks/useCookies'
import { loginPost } from 'utils/api'

type Headers = 'access-token' | 'client'

const Login: NextPage = () => {
  // email: test1@test.com, test2@test.com, test3@test.com
  const [email, setEmail] = useState<string>('test1@test.com')
  const [password, setPassword] = useState<string>('password')
  const { data: token, mutate: mutateToken } = useGlobalSWR('authInfo')
  const { cookies, set, remove } = useCookies('authInfo')

  const onLogin = useCallback(() => {
    const params = {
      email: email,
      password: password,
    }

    loginPost(params).then((res) => {
      if (!res) {
        return
      }

      let headers = { 'access-token': '', client: '', uid: '' }

      const isAuthInfo = (
        value: unknown,
      ): value is 'access-token' | 'client' | 'uid' => {
        if (value === 'access-token') {
          return true
        } else if (value === 'client') {
          return true
        } else if (value === 'uid') {
          return true
        }
        return false
      }

      for (let pair of res.headers.entries()) {
        if (isAuthInfo(pair[0])) {
          headers[pair[0]] = pair[1]
        }
        mutateToken(headers)
        set('authInfo', headers)
      }
    })
  }, [email, password, mutateToken, set])

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      onLogin()
      e.preventDefault()
    },
    [onLogin],
  )

  return (
    <>
      <div className='m-4'>
        <Link href='/'>index</Link>

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
              type='text'
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
    </>
  )
}

export default Login
