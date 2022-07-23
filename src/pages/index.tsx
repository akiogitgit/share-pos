import { NextPage } from 'next'
import Head from 'next/head'
import { PostItem } from 'components/PostItem'
import { Layout } from 'components/shared/Layout'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'

const Home: NextPage = () => {
  const { data: posts, error } = useGetApi<Post[]>('/posts')
  const { cookies } = useCookies('authInfo')
  // deleteApi('/posts/destroy_all', undefined, cookies.authInfo)

  if (!posts) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        <div className='sm:(flex flex-wrap justify-around) '>
          {posts.length &&
            posts.map((post, i) => <PostItem post={post} key={i} />)}
        </div>
      </Layout>
    </>
  )
}

export default Home
