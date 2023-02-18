import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useGetApi, useGetInfinite } from 'hooks/useApi'
import { Post, PostRequestParams } from 'types/post'
import { UserProfile, User } from 'types/user'
import { deleteApi, HttpError, postApi, putApi } from 'utils/api'

export const useCreatePost = () => {
  const { data: user } = useGetApi<User>('/users/me')
  const { mutate: mutatePosts } = useGetInfinite<Post>('/posts')
  const { data: profile, mutate: mutateProfile } = useGetApi<UserProfile>(
    `/users/${user?.id}`,
  )
  const router = useRouter()

  const createPost = useCallback(
    async (params: PostRequestParams) => {
      try {
        const newPost = await postApi<Post>('/posts', params)
        if (!newPost || !profile) {
          return
        }

        mutatePosts(undefined) // 全再取得 整合性は完璧
        mutateProfile({ ...profile, posts: [newPost, ...profile.posts] }, false)
        console.log('投稿の作成に成功 ', newPost)
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [profile, mutatePosts, mutateProfile, router],
  )

  return { createPost }
}

export const useUpdatePost = (post: Post) => {
  const { data: user } = useGetApi<User>('/users/me')
  const { data: posts, mutate: mutatePosts } = useGetInfinite<Post>('/posts')
  const { data: profile, mutate: mutateProfile } = useGetApi<UserProfile>(
    `/users/${user?.id}`,
  )

  const updatePost = useCallback(
    (params: PostRequestParams) => {
      try {
        const res = putApi<Post>(`/posts/${post.id}`, params)
        if (!posts || !profile) {
          return
        }
        const newPosts = posts.map(v => {
          if (v.id === post.id) {
            return { ...post, ...params }
          }
          return v
        })
        const newMyPosts = {
          ...profile,
          posts: profile.posts.map(v => {
            if (v.id === post.id) {
              return { ...post, ...params }
            }
            return v
          }),
        }

        mutatePosts([newPosts], false)
        mutateProfile(newMyPosts, false)
        console.log('投稿の修正に成功しました。 ', params)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [mutateProfile, mutatePosts, profile, post, posts],
  )

  return { updatePost }
}

export const useDeletePost = (post: Post) => {
  const { data: user } = useGetApi<User>('/users/me')
  const { mutate: mutatePosts } = useGetInfinite<Post>('/posts')
  const { data: profile, mutate: mutateProfile } = useGetApi<UserProfile>(
    `/users/${user?.id}`,
  )

  const deletePost = useCallback(() => {
    try {
      const res = deleteApi(`/posts/${post.id}`)
      if (!profile) {
        return
      }

      const newMyPosts = {
        ...profile,
        posts: profile.posts.filter(v => v.id !== post.id),
      }

      mutatePosts(undefined)
      mutateProfile(newMyPosts, false)

      console.log(res)
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e.message)
      }
    }
  }, [mutateProfile, mutatePosts, profile, post.id])

  return { deletePost }
}
