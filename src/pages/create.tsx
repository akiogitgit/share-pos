import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { PostForm } from 'components/postForm'
import { useGetApi } from 'hooks/useApi'
import { useGlobalState } from 'stores/useGlobalState'
import { PostCreateParams, PostResponse } from 'types/post'
import { HttpError, postApi } from 'utils/api'

const Create: NextPage = () => {
  const router = useRouter()
  const [authInfo] = useGlobalState('/authInfo')
  const { data: posts, mutate } = useGetApi('/posts')

  const onSubmit = useCallback(
    async (params: PostCreateParams) => {
      try {
        const res = await postApi<PostResponse>('/posts', params, authInfo)
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
    [authInfo, mutate, posts, router],
  )
  return (
    <>
      <div>
        <Link href='/'>index</Link>
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
    </>
  )
}

export default Create
