import { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from 'components/layout/Layout'
import { PostForm } from 'components/post/PostForm'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'
import { useCreatePost } from 'hooks/usePost'

const Create: NextPage = () => {
  useRequireLogin()
  const { createPost } = useCreatePost()
  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<PostRequestParams>(createPost)

  return (
    <>
      <Head>
        <title>SharePos 記事シェアページ</title>
      </Head>
      <Layout>
        <h1 className='font-bold text-center text-xl'>記事をシェア</h1>
        <div className='mt-12'>
          <PostForm onSubmit={createPost} />
        </div>
      </Layout>
    </>
  )
}

export default Create
