import type { NextPage } from 'next'
import Link from 'next/link'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'hooks/useCookies'

const Home: NextPage = () => {
  const { data, error } = useGetApi('/posts')
  const { cookies } = useCookies('authInfo')

  console.log(cookies.authInfo)
  return (
    <div>
      <h1 className='mt-0 mb-1 text-6xl  text-red-500'>share pos</h1>
      <div className='flex justify-end'>
        <Link href='/login'>Login</Link>
      </div>
      <div>{JSON.stringify(data)}</div>
      {error && <div>{JSON.stringify(error)}</div>}
    </div>
  )
}

export default Home
