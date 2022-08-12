import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { PostForm } from 'components/post/PostForm'
import { Layout } from 'components/shared/Layout'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useGetApi } from 'hooks/useApi'
import { Post, PostCreateParams } from 'types/post'
import { HttpError, postApi } from 'utils/api'

const Create: NextPage = () => {
  useRequireLogin()

  const router = useRouter()
  const authHeaderParams = useAuthHeaderParams()
  const { data: posts, mutate } = useGetApi<Post[]>('/posts')

  const onSubmit = useCallback(
    async (params: PostCreateParams) => {
      try {
        const newPost = await postApi<Post>('/posts', params, authHeaderParams)
        if (newPost && posts) {
          console.log('投稿の作成に成功 ', newPost)
          router.push('/')
          mutate([...posts, newPost], false)
        }
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [authHeaderParams, mutate, posts, router],
  )

  return (
    <>
      <Head>
        <title>SharePos 記事投稿ページ</title>
      </Head>
      <Layout>
        <h1 className='text-center text-lg'>記事投稿</h1>
        <div className='mt-4'>
          <PostForm onSubmit={onSubmit} />
        </div>
      </Layout>
    </>
  )
}

export default Create
