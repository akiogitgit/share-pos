import { NextPage } from 'next'
import Head from 'next/head'
import { useInView } from 'react-intersection-observer'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/PostItem'
import { Loader } from 'components/shares/base/Loader'
import { useGetInfinite } from 'hooks/useApi'
import { Post } from 'types/post'

const Home: NextPage = () => {
  const {
    data: posts,
    isValidating,
    isReachingEnd,
    fetchMore,
  } = useGetInfinite<Post>('/posts')

  const { ref, inView: isScrollEnd } = useInView()

  if (isScrollEnd && !isValidating && !isReachingEnd) {
    fetchMore()
  }

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

        {!isValidating && <div ref={ref} aria-hidden='true' />}

        <div aria-live='polite' className='mt-7 text-center'>
          {isValidating && <Loader size='xl' />}
        </div>
      </Layout>
    </>
  )
}

export default Home
