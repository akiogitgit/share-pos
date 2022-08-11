import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { PostItem } from 'components/post/PostItem'
import { PostItemList } from 'components/post/PostItemList'
import { PostStars } from 'components/post/PostStars'
import { Layout } from 'components/shared/Layout'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'

const Home: NextPage = () => {
  const { data: posts, error } = useGetApi<Post[]>('/posts')
  const { cookies } = useCookies('authInfo')
  // deleteApi('/posts/destroy_all', undefined, cookies.authInfo)
  const [stars, setStars] = useState(1)

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        <PostStars
          evaluation={stars}
          onClick={(newStar) => setStars(newStar)}
        />
        {posts && posts.length && (
          <PostItemList>
            {posts.map((post, i) => (
              <PostItem post={post} key={i} />
            ))}
          </PostItemList>
        )}
      </Layout>
    </>
  )
}

export default Home
