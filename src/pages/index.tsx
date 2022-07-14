import type { NextPage } from 'next'
import { Layout } from 'components/Layout'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'hooks/useCookies'

const Home: NextPage = () => {
  const { data, error } = useGetApi('/posts')
  const { cookies } = useCookies('authInfo')

  return (
    <Layout title='SharePos トップページ'>
      <div>{JSON.stringify(data)}</div>
      {error && <div>{JSON.stringify(error)}</div>}
    </Layout>
  )
}

export default Home
