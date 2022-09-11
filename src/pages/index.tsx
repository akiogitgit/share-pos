import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { Post } from 'types/post'
import { deleteApi } from 'utils/api'

const Home: NextPage = () => {
  const { data: posts, error } = useGetApi<Post[]>('/posts')
  const authHeaderParams = useAuthHeaderParams()
  if (false) {
    deleteApi('/posts/delete_all', undefined, authHeaderParams)
  }
  const [stars, setStars] = useState(1)

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        {/* <PostStars
          evaluation={stars}
          onClick={(newStar) => setStars(newStar)}
        /> */}
        {posts?.length && (
          <div className='mt-4'>
            <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'>
              {posts.map((post, i) => (
                <div key={i} className='mb-1'>
                  <PostItem post={post} key={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Home
