import { useCallback } from 'react'
import { useGetApi } from './useApi'
import { User, UserProfile } from 'types/user'
import { postApi, HttpError, deleteApi } from 'utils/api'

export const useFollow = (id: number) => {
  // フォローされたユーザー、自分のuserProfile
  const { data: userProfile, mutate: mutateUserProfile } =
    useGetApi<UserProfile>(`/users/${id}`)
  const { data: currentUser } = useGetApi<User>('/users/me')
  const { data: currentUserProfile, mutate: mutateCurrentUserProfile } =
    useGetApi<UserProfile>(`/users/${currentUser?.id}`)

  const follow = useCallback(async () => {
    try {
      const res = await postApi(`/users/${id}/follow`)
      console.log('follow: ', res)

      // 他の人のフォロー、フォロワー一覧で、フォローするのは無理
      // フォロー一覧、フォロワー一覧は毎回fetchする

      if (!userProfile || !currentUser || !currentUserProfile) return

      // フォローされたユーザーの、userProfile 更新
      mutateUserProfile(
        {
          ...userProfile,
          isFollowing: true,
          followerCount: userProfile.followerCount + 1,
        },
        false,
      )

      // 自分のuserProfile 更新
      mutateCurrentUserProfile(
        {
          ...currentUserProfile,
          followingCount: currentUserProfile.followingCount + 1,
        },
        false,
      )
    } catch (e) {
      if (e instanceof HttpError) {
        console.log(e)
      }
    }
  }, [
    currentUser,
    currentUserProfile,
    id,
    mutateCurrentUserProfile,
    mutateUserProfile,
    userProfile,
  ])

  const unFollow = useCallback(async () => {
    try {
      const res = await deleteApi(`/users/${id}/follow`)
      console.log('unFollow: ', res)

      if (!userProfile || !currentUser || !currentUserProfile) return

      mutateUserProfile(
        {
          ...userProfile,
          isFollowing: false,
          followerCount: userProfile.followerCount - 1,
        },
        false,
      )

      mutateCurrentUserProfile(
        {
          ...currentUserProfile,
          followingCount: currentUserProfile.followingCount - 1,
        },
        false,
      )
    } catch (e) {
      if (e instanceof HttpError) {
        console.log(e)
      }
    }
  }, [
    currentUser,
    currentUserProfile,
    id,
    mutateCurrentUserProfile,
    mutateUserProfile,
    userProfile,
  ])

  return { follow, unFollow }
}
