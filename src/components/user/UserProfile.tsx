import { FC, useState } from 'react'
import { UserCard } from './UserCard'
import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { Modal } from 'components/shares/base/Modal'
import { useGetApi } from 'hooks/useApi'
import { useBoolean } from 'hooks/useBoolean'
import { useFollow, useUnFollow } from 'hooks/useFollow'
import { User, UserInfo, UserProfile as UserProfileType } from 'types/user'

const modalTabs = ['フォロー一覧', 'フォロワー一覧'] as const

type Props = {
  userProfile: UserProfileType
  isMyPage: boolean
}

export const UserProfile: FC<Props> = ({ userProfile, isMyPage }) => {
  const { follow } = useFollow(userProfile?.user.id || 0)
  const { unFollow } = useUnFollow(userProfile?.user.id || 0)

  const { data: currentUser } = useGetApi<User>('/users/me')

  // モーダル
  const open = useBoolean(false)
  const [selected, setSelected] =
    useState<typeof modalTabs[number]>('フォロー一覧')

  const { data: followers, mutate: mutateFollowers } = useGetApi<UserInfo[]>(
    `/users/${userProfile?.user.id}/followers`,
  )
  const { data: followings, mutate: mutateFollowings } = useGetApi<UserInfo[]>(
    `/users/${userProfile?.user.id}/followings`,
  )

  return (
    <div>
      <section className='ml-4'>
        <div className='flex justify-between items-center'>
          <div>
            <div className='w-23 whitespace-nowrap sm:(flex gap-5 w-full) '>
              <Avatar id={Number(userProfile?.user.id)} size='xl' />
              <div>
                <h1 className='font-bold mt-2 text-2xl'>
                  {userProfile?.user.username}
                </h1>
                <div className='flex mt-4 gap-3'>
                  <div
                    onClick={() => {
                      open.setTrue()
                      setSelected('フォロー一覧')
                      mutateFollowings(followings)
                    }}
                    className='cursor-pointer'
                  >
                    <span className='font-bold'>
                      {userProfile.followingCount}
                    </span>{' '}
                    <span className='text-gray-500'>フォロー</span>
                  </div>
                  <div
                    onClick={() => {
                      open.setTrue()
                      setSelected('フォロワー一覧')
                      mutateFollowers(followers)
                    }}
                    className='cursor-pointer'
                  >
                    <span className='font-bold'>
                      {userProfile.followerCount}
                    </span>{' '}
                    <span className='text-gray-500'>フォロワー</span>
                  </div>
                  <p>
                    <span className='font-bold'>
                      {userProfile?.posts.length}
                    </span>{' '}
                    <span className='text-gray-500'>シェア</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='transform translate-y-[-42px] sm:translate-y-0'>
            {currentUser ? (
              isMyPage ? (
                <Button
                  radius='xs'
                  variant='neumorphism'
                  className='whitespace-nowrap'
                >
                  プロフィールを編集
                </Button>
              ) : userProfile.isFollowing ? (
                <Button
                  color='primary'
                  size='md'
                  radius='xl'
                  variant='outline'
                  onClick={unFollow}
                >
                  フォロー中
                </Button>
              ) : (
                <Button
                  color='primary'
                  size='md'
                  radius='xl'
                  animate
                  onClick={follow}
                >
                  フォロー
                </Button>
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </section>

      {/* フォロー・フォロワー一覧モーダル */}
      <Modal
        size='md'
        open={open.v}
        onClose={open.setFalse}
        title={
          <div className='w-full px-2 gap-3'>
            <div className='border-b flex border-gray-300'>
              {modalTabs.map(tab => (
                <div
                  key={tab}
                  className={`cursor-pointer text-lg text-center pb-1 w-50vw ${
                    tab === selected &&
                    'border-primary-dark border-b-3 text-primary-dark'
                  }`}
                  onClick={() => {
                    setSelected(tab)
                    // タブを移動する毎に再検証
                    if (selected === tab) return
                    if (tab === 'フォロー一覧') mutateFollowings(followings)
                    if (tab === 'フォロワー一覧') mutateFollowers(followers)
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className='bg-white rounded-lg flex flex-col py-6 px-4 gap-6'>
          {selected === 'フォロワー一覧' ? (
            followers?.length ? (
              followers.map(user => (
                <UserCard
                  key={`${user.id} ${user.isFollowing}`}
                  user={user}
                  onClickUser={open.setFalse}
                />
              ))
            ) : (
              <p className='text-center'>フォロワーはいません</p>
            )
          ) : followings?.length ? (
            followings.map(user => (
              <UserCard
                key={`${user.id} ${user.isFollowing}`}
                user={user}
                onClickUser={open.setFalse}
              />
            ))
          ) : (
            <p className='text-center'>フォローしているユーザーはいません</p>
          )}
        </div>
      </Modal>
    </div>
  )
}
