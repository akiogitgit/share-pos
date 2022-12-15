import { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useGetApi } from 'hooks/useApi'
import { Post } from 'types/post'

const Home: NextPage = () => {
  const { data: posts, error } = useGetApi<Post[]>('/posts')

  // コメント機能
  // const addReplyComment = useCallback(async () => {
  //   try {
  //     const res = await postApi('/reply_comments', {
  //       postId: 3,
  //       body: 'コメントです',
  //     })
  //     console.log(res)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [])
  // const updateReplyComment = useCallback(async (id: number) => {
  //   try {
  //     const res = await putApi(`/reply_comments/${id}`, {
  //       body: 'update',
  //     })
  //     console.log(res)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [])
  // const deleteReplyComment = useCallback(async (id: number) => {
  //   try {
  //     const res = await deleteApi(`/reply_comments/${id}`)
  //     console.log(res)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [])

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        {/* <Button onClick={addReplyComment}>追加</Button>
        <Button onClick={() => updateReplyComment(13)}>更新</Button>
        <Button onClick={() => deleteReplyComment(15)}>削除</Button> */}

        {posts && (
          <div className='mt-4'>
            {/* <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'> */}
            {/* <div className='grid gap-6 justify-center items-start sm:grid-cols-2 md:grid-cols-3'> */}
            {/* <div className='mt-10 grid gap-6 items-start justify-center sm:mx-4 sm:grid-cols-2 lg:grid-cols-3'> */}
            <div className='mt-10 grid gap-6 items-start justify-center sm:mx-4 sm:grid-cols-2 lg:grid-cols-3'>
              {posts.map((post, i) => (
                <div key={i} className='mb-1'>
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
