import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useGetApi } from 'hooks/useApi'
import { Post, PostRequestParams } from 'types/post'
import { UserProfile, User } from 'types/user/user'
import { deleteApi, HttpError, postApi, putApi } from 'utils/api'

export const useCreatePost = () => {
  const { data: user } = useGetApi<User>('/users/me')
  const { data: posts, mutate: mutatePosts } = useGetApi<Post[]>('/posts')
  const { data: profile, mutate: mutateProfile } = useGetApi<UserProfile>(
    `/users/${user?.id}`,
  )
  const router = useRouter()

  const createPost = useCallback(
    async (params: PostRequestParams) => {
      try {
        const newPost = await postApi<Post>('/posts', params)
        if (!newPost || !posts || !profile) {
          return
        }

        mutatePosts([newPost, ...posts], false)
        mutateProfile({ ...profile, posts: [newPost, ...profile.posts] }, false)
        console.log('投稿の作成に成功 ', newPost)
        router.push('/')
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [mutateProfile, mutatePosts, profile, posts, router],
  )

  return { createPost }
}

export const useUpdatePost = (post: Post) => {
  const { data: user } = useGetApi<User>('/users/me')
  const { data: posts, mutate: mutatePosts } = useGetApi<Post[]>('/posts')
  const { data: profile, mutate: mutateProfile } = useGetApi<UserProfile>(
    `/users/${user?.id}`,
  )

  const updatePost = useCallback(
    async (params: PostRequestParams) => {
      try {
        const res = await putApi<Post>(`/posts/${post.id}`, params)
        if (!res || !posts || !profile) {
          return
        }
        const newPosts = posts.map(post => {
          if (post.id === res.id) {
            return res
          }
          return post
        })
        const newMyPosts = {
          ...profile,
          posts: profile.posts.map(post => {
            if (post.id === res.id) {
              return res
            }
            return post
          }),
        }

        mutatePosts(newPosts, false)
        mutateProfile(newMyPosts, false)
        console.log('投稿の修正に成功しました。 ', params)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [mutateProfile, mutatePosts, profile, post.id, posts],
  )

  return { updatePost }
}

export const useDeletePost = (post: Post) => {
  const { data: user } = useGetApi<User>('/users/me')
  const { data: posts, mutate: mutatePosts } = useGetApi<Post[]>('/posts')
  const { data: profile, mutate: mutateProfile } = useGetApi<UserProfile>(
    `/users/${user?.id}`,
  )

  const deletePost = useCallback(async () => {
    try {
      const res = await deleteApi(`/posts/${post.id}`)
      if (!posts || !profile) {
        return
      }
      const newPosts = posts.filter(v => v.id !== post.id)

      const newMyPosts = {
        ...profile,
        posts: profile.posts.filter(v => v.id !== post.id),
      }

      mutatePosts(newPosts, false)
      mutateProfile(newMyPosts, false)

      console.log(res)
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e.message)
      }
    }
  }, [mutateProfile, mutatePosts, profile, post.id, posts])

  return { deletePost }
}
