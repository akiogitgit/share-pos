import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Layout } from 'components/Layout'
import { PostForm } from 'components/PostForm'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'hooks/useCookies'
import { useRequireLogin } from 'hooks/useRequireLogin'
import { PostCreateParams, PostResponse } from 'types/post'
import { HttpError, postApi } from 'utils/api'

const Create: NextPage = () => {
  const router = useRouter()
  const { cookies } = useCookies('authInfo')
  const { data: posts, mutate } = useGetApi('/posts')

  // ログインしていないとログインページに飛ぶ
  useRequireLogin()

  const onSubmit = useCallback(
    async (params: PostCreateParams) => {
      try {
        const res = await postApi<PostResponse>(
          '/posts',
          params,
          cookies.authInfo,
        )
        if (res.data) {
          console.log('res: ', res.data)
          const newPost = res.data
          mutate({ ...posts, newPost }, false)
          router.push('/')
        }
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e)
        }
      }
    },
    [cookies.authInfo, mutate, posts, router],
  )

  return (
    <Layout title='SharePos 記事投稿ページ'>
      <div>
        <h1>Post Create</h1>
        <PostForm onSubmit={onSubmit} />
        {/* <div>
          {posts &&
            posts.data
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
  )
}

export default Create
