import { NextPage } from 'next'
import Head from 'next/head'

import { useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/PostItem'
import { Button } from 'components/shares/base/Button'
import { useGetApi } from 'hooks/useApi'
import { Post } from 'types/post'

const totalPosts: Post[] = []
let isSetPosts = false

const Home: NextPage = () => {
  const [page, setPage] = useState(1)
  const { data: posts, error } = useGetApi<Post[]>(`/posts?page=${page}`)

  if (posts?.length && !isSetPosts) {
    totalPosts.push(...posts)
    isSetPosts = true
  }

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        {totalPosts && (
          <div className='mt-4'>
            <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'>
              {totalPosts.map((post, i) => (
                <div key={i} className='mb-1'>
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='mt-10 text-center'>
          {posts?.length === 24 && (
            <Button
              variant='neumorphism'
              size='lg'
              onClick={() => {
                setPage(page + 1)
                isSetPosts = false
              }}
            >
              もっと見る
            </Button>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Home
