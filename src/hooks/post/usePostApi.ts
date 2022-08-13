import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { Post, PostRequestParams } from 'types/post'
import { deleteApi, HttpError, postApi, putApi } from 'utils/api'

type Props = {
  post: Post
}

// どうしても、ここでsetIsEditを受け取らなきゃだめ
// update, delete もバラす？
// カスタムフックのpropsのやり方
export const usePostApi = (
  post: Post,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
) => {
  // export const usePostApi:FC<Props>=(post) => {
  const { data: posts, mutate } = useGetApi<Post[]>('/posts')
  const authHeaderParams = useAuthHeaderParams()

  const router = useRouter()

  // usePostApiの引数が無理
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

  const updatePost = useCallback(
    async (params: PostRequestParams) => {
      try {
        const res = await putApi<Post>(
          `/posts/${post.id}`,
          params,
          authHeaderParams,
        )
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
        setIsEdit(false) // どうしても、ここじゃなきゃ発火できない
        console.log('投稿の修正に成功しました。 ', params)
      } catch (e) {
        console.error(e)
      }
    },
    [authHeaderParams, mutate, post.id, posts, setIsEdit],
  )

  const deletePost = useCallback(async () => {
    try {
      const res = await deleteApi(
        `/posts/${post.id}`,
        undefined,
        authHeaderParams,
      )
      if (!posts) {
        return
      }
      const newPosts = posts.filter((v) => v.id !== post.id)
      mutate(newPosts, false)

      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }, [authHeaderParams, mutate, post.id, posts])

  return { createPost, updatePost, deletePost }
}
