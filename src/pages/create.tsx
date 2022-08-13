import { NextPage } from 'next'
import Head from 'next/head'
import { PostForm } from 'components/post/PostForm'
import { Layout } from 'components/shared/Layout'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useCreatePost } from 'hooks/post/useCreatePost'

const Create: NextPage = () => {
  useRequireLogin()
  const { createPost } = useCreatePost()

  return (
    <>
      <Head>
        <title>SharePos 記事投稿ページ</title>
      </Head>
      <Layout>
        <h1 className='text-center text-lg'>記事投稿</h1>
        <div className='mt-4'>
          <PostForm onSubmit={createPost} />
        </div>
      </Layout>
    </>
  )
}

export default Create
