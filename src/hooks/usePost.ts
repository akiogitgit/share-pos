import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useGetApi } from 'hooks/useApi'
import { Post, PostRequestParams } from 'types/post'
import { deleteApi, HttpError, postApi, putApi } from 'utils/api'

export const useCreatePost = () => {
  const { data: posts, mutate } = useGetApi<Post[]>('/posts')
  const router = useRouter()

  const createPost = useCallback(
    async (params: PostRequestParams) => {
      try {
        const newPost = await postApi<Post>('/posts', params)
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
    [mutate, posts, router],
  )

  return { createPost }
}

export const useUpdatePost = (post: Post) => {
  const { data: posts, mutate } = useGetApi<Post[]>('/posts')

  const updatePost = useCallback(
    async (params: PostRequestParams) => {
      try {
        const res = await putApi<Post>(`/posts/${post.id}`, params)
        if (!res || !posts) {
          return
        }
        const newPosts = posts.map((post) => {
          if (post.id === res.id) {
            return res
          }
          return post
        })

        mutate(newPosts, false)
        console.log('投稿の修正に成功しました。 ', params)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [mutate, post.id, posts],
  )

  return { updatePost }
}

export const useDeletePost = (post: Post) => {
  const { data: posts, mutate } = useGetApi<Post[]>('/posts')

  const deletePost = useCallback(async () => {
    try {
      const res = await deleteApi(`/posts/${post.id}`)
      if (!posts) {
        return
      }
      const newPosts = posts.filter((v) => v.id !== post.id)
      mutate(newPosts, false)

      console.log(res)
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e.message)
      }
    }
  }, [mutate, post.id, posts])

  return { deletePost }
}
