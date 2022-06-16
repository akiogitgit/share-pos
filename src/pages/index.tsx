import type { NextPage } from 'next'
import { useGetApi } from './../hooks/useApi'

const Home: NextPage = () => {
  const { data, error } = useGetApi('/posts')
  return (
    <div>
      <h1 className='mt-0 mb-1 text-6xl  text-red-500'>share pos</h1>
      <div>{JSON.stringify(data)}</div>
      {error && <div>{JSON.stringify(error)}</div>}
    </div>
  )
}

export default Home
