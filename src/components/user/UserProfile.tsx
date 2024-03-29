import { FC, useState } from 'react'

import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { Modal } from 'components/shares/base/Modal'
import { useGetApi } from 'hooks/useApi'
import { useBoolean } from 'hooks/useBoolean'
import { useFollow, useUnFollow } from 'hooks/useFollow'
import { User, UserInfo, UserProfile as UserProfileType } from 'types/user'

import { UserCard } from './UserCard'

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
    useState<(typeof modalTabs)[number]>('フォロー一覧')

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
                  <button
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
                  </button>
                  <button
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
                  </button>
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
            {/* aria-live付けたい */}
            {currentUser ? (
              isMyPage ? (
                <Button
                  radius='xs'
                  variant='neumorphism'
                  className='whitespace-nowrap'
                >
                  プロフィールを編集
                </Button>
              ) : (
                <Button
                  size='md'
                  radius='xl'
                  variant={userProfile.isFollowing ? 'outline' : 'filled'}
                  animate={userProfile.isFollowing ? false : true}
                  onClick={userProfile.isFollowing ? unFollow : follow}
                >
                  <span aria-live='polite'>
                    {userProfile.isFollowing ? 'フォロー中' : 'フォロー'}
                  </span>
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
          <div
            role='tablist'
            className='border-b flex border-gray-300 w-full px-2 gap-3'
          >
            {modalTabs.map(tab => (
              <button
                key={tab}
                role='tab'
                aria-selected={selected === tab}
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
              </button>
            ))}
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
