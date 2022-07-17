import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from 'components/Layout'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'hooks/useCookies'

const Home: NextPage = () => {
  const { data, error } = useGetApi('/posts')
  const { cookies } = useCookies('authInfo')

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        <div>{JSON.stringify(data)}</div>
        {error && <div>{JSON.stringify(error)}</div>}
      </Layout>
    </>
  )
}

export default Home
