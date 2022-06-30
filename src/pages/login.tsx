import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { loginPost } from 'utils/api'

const Login: NextPage = () => {
  // email: test1@test.com, test2@test.com, test3@test.com
  const [email, setEmail] = useState<string>('test1@test.com')
  const [password, setPassword] = useState<string>('password')

  const onLogin = useCallback((params: any) => {
    loginPost(params).then((res) => {
      const headers = ['access-token', 'client', 'expiry', 'uid']

      for (let pair of res.headers.entries()) {
        const index = headers.indexOf(pair[0])
        if (index != -1) {
          sessionStorage.setItem(headers[index], pair[1])
        }
        console.log(pair[0] + ': ' + pair[1])
      }
    })
  }, [])

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const params = {
        email: email,
        password: password,
      }
      onLogin(params)

      e.preventDefault()
    },
    [onLogin, email, password],
  )

  return (
    <>
      <div className='m-4'>
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
