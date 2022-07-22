import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Layout } from 'components/Layout'
import { PostForm } from 'components/PostForm'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'hooks/useCookies'
import { Post, PostCreateParams } from 'types/post'
import { HttpError, postApi } from 'utils/api'

const Create: NextPage = () => {
  useRequireLogin()

  const router = useRouter()
  const { cookies } = useCookies('authInfo')
  const { data: posts, mutate } = useGetApi<Post[]>('/posts')

  const onSubmit = useCallback(
    async (params: PostCreateParams) => {
      try {
        const newPost = await postApi<Post>('/posts', params, cookies.authInfo)
        if (newPost && posts) {
          console.log('newPost: ', newPost)
          router.push('/')
          mutate([...posts, newPost], false)
        }
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [cookies.authInfo, mutate, posts, router],
  )

  return (
    <>
      <Head>
        <title>SharePos 記事投稿ページ</title>
      </Head>
      <Layout>
        <div>
          <h1>Post Create</h1>
          <PostForm onSubmit={onSubmit} />
          {/* <div>
            {posts?.length &&
              posts
                .map((_, i, a) => a[a.length - 1 - i])
                .map((v, i) => (
                  <ul key={i} className='mt-3'>
                    <li>{v.comment}</li>
                    <li>{v.url}</li>
                    <li>{v.comment}</li>
                  </ul>
                ))}
          </div>
          <div>{JSON.stringify(posts)}</div> */}
        </div>
      </Layout>
    </>
  )
}

export default Create
