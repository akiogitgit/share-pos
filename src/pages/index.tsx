import { NextPage } from 'next'
import Head from 'next/head'

import { useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/PostItem'
import { Button } from 'components/shares/base/Button'
import { Post } from 'types/post'
import { fetchApi } from 'utils/api'

const Home: NextPage = () => {
  const getKey = (pageIndex: number, previousPageData: Post[][]) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    return `/posts?page=${pageIndex + 1}` // SWR キー
  }

  const fetcher = useCallback(
    async (url: string) => await fetchApi<Post[]>(url, 'GET'),
    [],
  )

  const {
    data: posts,
    size: page,
    setSize: setPage,
  } = useSWRInfinite(getKey, fetcher, {
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })

  const limit = 24
  const isEmpty = posts?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (posts && posts?.[posts?.length - 1]?.length < limit)

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        {posts && (
          <div className='mt-4'>
            <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'>
              {posts.flat().map((post, i) => (
                <div key={i} className='mb-1'>
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isReachingEnd && (
          <div className='mt-10 text-center'>
            <Button
              variant='neumorphism'
              size='lg'
              onClick={() => {
                setPage(page + 1)
              }}
            >
              もっと見る
            </Button>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Home
