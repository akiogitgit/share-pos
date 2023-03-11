import { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from 'components/layout/Layout'
import { PostForm, PostRequestParams } from 'components/post/PostForm'
import { Alert } from 'components/shares/base/Alert'
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
        <div className='my-6'>
          {errorMessage && (
            <Alert className='mx-auto max-w-420px' onClose={clearErrorMessage}>
              {errorMessage}
            </Alert>
          )}
        </div>

        <PostForm onSubmit={onSubmit} />
      </Layout>
    </>
  )
}

export default Create
