import { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useLogin } from 'hooks/useLogin'
import { LoginRequestParams } from 'types/user/authInfo'
import { SignUpFormParams, SignUpResponseParams } from 'types/user/form'
import { HttpError, postApi } from 'utils/api'

const SignUp: NextPage = () => {
  const [signUpFormParams, setSignUpFormParams] = useState<SignUpFormParams>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const { login } = useLogin()
  // const [username, setUsername] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [passwordConfirmation, setPasswordConfirmation] = useState('')
  // useEffect(() => {
  //   setSignUpFormParams({
  //     username: '',
  //     email: '',
  //     password: '',
  //     passwordConfirmation: '',
  //   })
  // }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormParams((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  const doSignUp = async (params: any) => {
    try {
      const res = await postApi<SignUpResponseParams>('/auth', params)
      if (!res) {
        throw new HttpError(res)
      }
      return res as SignUpResponseParams
    } catch (e) {
      console.log(HttpError)
    }
  }

  const signUp = useCallback(async () => {
    await doSignUp(signUpFormParams).then((res) => {
      if (!res) {
        return
      }
      console.log('ユーザー作成に成功しました', res)
    })
    // ユーザー作成に成功したら、そのままログイン
    const loginParams: LoginRequestParams = {
      email: signUpFormParams.email,
      password: signUpFormParams.password,
    }
    login(loginParams)
  }, [login, signUpFormParams])

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      // passwordの二重チェックする
      signUp()
      // try {
      //   const res = await postApi<PostResponse>('/posts', params, authInfo)
      //   if (res.data) {
      //     console.log('res: ', res.data)
      //     const newPost = res.data
      //     mutate({ ...posts, newPost }, false)
      //     router.push('/')
      //   }
      // } catch (e) {
      //   if (e instanceof HttpError) {
      //     console.error(e)
      //   }
      // }
      console.log(signUpFormParams)
      e.preventDefault()
    },
    [signUpFormParams],
  )

  return (
    <div className='m-4'>
      <Link href='/'>index</Link>
      <h1>Sign Up</h1>

      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            value={signUpFormParams?.username}
            // value={username}
            placeholder='username'
            required
            name='username'
            // onChange={(e) => setUsername(e.target.value)}
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <div>
          <input
            type='text'
            value={signUpFormParams?.email}
            // value={email}
            placeholder='email' // ○○@○○.○○  のフォーマットでないとダメ
            required
            name='email'
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <div>
          <input
            type='password'
            value={signUpFormParams?.password}
            // value={password}
            placeholder='password'
            required
            name='password'
            // onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <div>
          <input
            type='password'
            value={signUpFormParams?.passwordConfirmation}
            // value={passwordConfirmation}
            placeholder='確認用パスワード'
            required
            name='passwordConfirmation'
            // onChange={(e) => setPasswordConfirmation(e.target.value)}
            onChange={(e) => handleChange(e)}
            className='border-black outline-none border-b-2 p-2'
          />
        </div>
        <button
          type='submit'
          className='font-serif bg-blue-500 border-2 border-blue-500 mt-3 text-white p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-blue-500) '
        >
          ユーザー作成
        </button>
      </form>
    </div>
  )
}

export default SignUp
