import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { PostRequestParams, Post } from 'types/post'
import { postApi, HttpError } from 'utils/api'

export const useCreatePost = () => {
  const { data: posts, mutate } = useGetApi<Post[]>('/posts')
  const authHeaderParams = useAuthHeaderParams()
  const router = useRouter()

  const createPost = useCallback(
    async (params: PostRequestParams) => {
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

  return { createPost }
}
