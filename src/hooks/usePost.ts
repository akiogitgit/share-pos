import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useGetApi, useGetInfinite } from 'hooks/useApi'
import { UserPosts, Post, PostRequestParams } from 'types/post'
import { User } from 'types/user/user'
import { deleteApi, HttpError, postApi, putApi } from 'utils/api'

export const useCreatePost = () => {
  const { data: user } = useGetApi<User>('/users/me')
  const { mutate: mutatePosts } = useGetInfinite<Post>('/posts')
  const { data: myPosts, mutate: mutateMyPosts } = useGetApi<UserPosts>(
    `/users/${user?.id}`,
  )
  const router = useRouter()

  const createPost = useCallback(
    async (params: PostRequestParams) => {
      try {
        const newPost = await postApi<Post>('/posts', params)
        if (!newPost || !myPosts) {
          return
        }

        mutatePosts(undefined)
        mutateMyPosts(
          { user: myPosts.user, posts: [newPost, ...myPosts.posts] },
          false,
        )
        console.log('投稿の作成に成功 ', newPost)
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [mutateMyPosts, mutatePosts, myPosts, router],
  )

  return { createPost }
}

export const useUpdatePost = (post: Post) => {
  const { data: user } = useGetApi<User>('/users/me')
  const { data: posts, mutate: mutatePosts } = useGetInfinite<Post>('/posts')
  const { data: myPosts, mutate: mutateMyPosts } = useGetApi<UserPosts>(
    `/users/${user?.id}`,
  )

  const updatePost = useCallback(
    (params: PostRequestParams) => {
      try {
        const res = putApi<Post>(`/posts/${post.id}`, params)
        if (!posts || !myPosts) {
          return
        }
        const newPosts = posts.map(v => {
          if (v.id === post.id) {
            return { ...post, ...params }
          }
          return v
        })
        const newMyPosts = {
          user: myPosts.user,
          posts: myPosts.posts.map(v => {
            if (v.id === post.id) {
              return { ...post, ...params }
            }
            return v
          }),
        }

        mutatePosts([newPosts], false)
        mutateMyPosts(newMyPosts, false)
        console.log('投稿の修正に成功しました。 ', params)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [mutateMyPosts, mutatePosts, myPosts, post, posts],
  )

  return { updatePost }
}

export const useDeletePost = (post: Post) => {
  const { data: user } = useGetApi<User>('/users/me')
  const { mutate: mutatePosts } = useGetInfinite<Post>('/posts')
  const { data: myPosts, mutate: mutateMyPosts } = useGetApi<UserPosts>(
    `/users/${user?.id}`,
  )

  const deletePost = useCallback(() => {
    try {
      const res = deleteApi(`/posts/${post.id}`)
      if (!myPosts) {
        return
      }

      const newMyPosts = {
        user: myPosts.user,
        posts: myPosts.posts.filter(v => v.id !== post.id),
      }

      // mutatePosts([newPosts], false)
      mutatePosts(undefined)
      mutateMyPosts(newMyPosts, false)

      console.log(res)
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e.message)
      }
    }
  }, [mutateMyPosts, mutatePosts, myPosts, post.id])

  return { deletePost }
}
