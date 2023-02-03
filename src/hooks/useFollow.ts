import { useCallback } from 'react'
import { useGetApi } from './useApi'
import { User, UserProfile } from 'types/user/user'
import { postApi, HttpError, deleteApi } from 'utils/api'

export const useFollow = (id: number) => {
  // フォローされたユーザー、自分のuserInfo
  const { data: userInfo, mutate: mutateUserProfile } = useGetApi<UserProfile>(
    `/users/${id}`,
  )
  const { data: currentUser } = useGetApi<User>('/users/me')
  const { data: currentUserProfile, mutate: mutateCurrentUserProfile } =
    useGetApi<UserProfile>(`/users/${currentUser?.id}`)

  const follow = useCallback(async () => {
    try {
      const res = await postApi(`/users/${id}/follow`)
      console.log('follow: ', res)

      // 他の人のフォロー、フォロワー一覧で、フォローするのは無理
      // フォロー一覧、フォロワー一覧は毎回fetchする

      if (!userInfo || !currentUser || !currentUserProfile) return

      // フォローされたユーザーの、userInfo 更新
      mutateUserProfile({
        ...userInfo,
        isFollowed: true,
        followerCount: userInfo.followerCount++,
      })

      // 自分のuserInfo 更新
      mutateCurrentUserProfile({
        ...currentUserProfile,
        followingCount: currentUserProfile.followingCount++,
      })
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
    userInfo,
  ])

  const unFollow = useCallback(async () => {
    try {
      const res = await deleteApi(`/users/${id}/follow`)
      console.log('unFollow: ', res)

      if (!userInfo || !currentUser || !currentUserProfile) return

      mutateUserProfile({
        ...userInfo,
        isFollowed: false,
        followerCount: userInfo.followerCount--,
      })

      mutateCurrentUserProfile({
        ...currentUserProfile,
        followingCount: currentUserProfile.followingCount--,
      })
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
    userInfo,
  ])

  return { follow, unFollow }
}
