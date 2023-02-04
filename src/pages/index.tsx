import { NextPage } from 'next'
import Head from 'next/head'

import { useInView } from 'react-intersection-observer'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/PostItem'
import { Button } from 'components/shares/base/Button'
import { useGetInfinite } from 'hooks/useApi'
import { Post } from 'types/post'

const Home: NextPage = () => {
  const {
    data: posts,
    isValidating,
    isReachingEnd,
    fetchMore,
  } = useGetInfinite<Post>('/posts')

  const { ref, inView } = useInView()

  if (inView && !isValidating && !isReachingEnd) {
    console.log('fetch!!!!!!!')
    fetchMore()
  }

  console.log('isValidating: ', isValidating, posts?.length)

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        {posts && (
          <div className='mt-4'>
            <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'>
              {posts.map((post, i) => (
                <div key={i} className='mb-1'>
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isReachingEnd && (
          <div className='mt-10 text-center'>
            <Button variant='neumorphism' size='lg' onClick={fetchMore}>
              もっと見る
            </Button>
          </div>
        )}

        {posts && !isValidating && <div className='' ref={ref} />}
      </Layout>
    </>
  )
}

export default Home
