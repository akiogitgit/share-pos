import { NextPage } from 'next'
import Head from 'next/head'

import { useCallback } from 'react'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { Button } from 'components/shares/button'
import { useGetApi } from 'hooks/useApi'
import { Post } from 'types/post'
import { deleteApi, postApi, putApi } from 'utils/api'

const Home: NextPage = () => {
  const { data: posts, error } = useGetApi<Post[]>('/posts')
  console.log(posts)

  const addReplyComment = useCallback(async () => {
    try {
      const res = await postApi('/reply_comments', {
        userId: 1,
        postId: 2,
        body: '222コメントです',
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }, [])
  const updateReplyComment = useCallback(async (id: number) => {
    try {
      const res = await putApi(`/reply_comments/${id}`, {
        body: 'update',
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }, [])
  const deleteReplyComment = useCallback(async (id: number) => {
    try {
      const res = await deleteApi(`/reply_comments/${id}`)
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        <Button onClick={addReplyComment}>追加</Button>
        <Button onClick={() => updateReplyComment(13)}>更新</Button>
        <Button onClick={() => deleteReplyComment(15)}>削除</Button>

        {posts && (
          <div className='mt-4'>
            <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'>
              {posts.map(post => (
                <div key={post.id} className='mb-1'>
                  <PostItem post={post} />
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
