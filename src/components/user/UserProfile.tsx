import { FC, useState } from 'react'
import { UserFollowListModal } from './UserFollowListModal'
import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { useGetApi } from 'hooks/useApi'
import { useFollow, useUnFollow } from 'hooks/useFollow'
import { User, UserProfile as UserProfileType } from 'types/user'

// UserProfile = {id, username, isFollowing, followerCount, followingCount}
// UserPosts = Postsにする

type Props = {
  userProfile: UserProfileType
  isMyPage: boolean
}

export const UserProfile: FC<Props> = ({ userProfile, isMyPage }) => {
  const { follow } = useFollow(userProfile?.user.id || 0)
  const { unFollow } = useUnFollow(userProfile?.user.id || 0)

  const { data: currentUser } = useGetApi<User>('/users/me')

  // モーダル
  const [open, setOpen] = useState(false)
  // モーダルで表示のがフォロワー一覧
  const [selected, setSelected] = useState<'フォロー一覧' | 'フォロワー一覧'>(
    'フォロー一覧',
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
                      setOpen(true)
                      setSelected('フォロー一覧')
                      // mutateFollowings(followings)
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
                      setOpen(true)
                      setSelected('フォロワー一覧')
                      // mutateFollowers(followers)
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
                  size='sm'
                  radius='xl'
                  variant='outline'
                  onClick={unFollow}
                >
                  フォロー解除
                </Button>
              ) : (
                <Button
                  color='primary'
                  size='sm'
                  radius='xl'
                  animate
                  onClick={follow}
                >
                  フォローする
                </Button>
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </section>

      {/* selectedはここで定義して、渡す */}
      {/* 開くたびに再検証したい */}
      {/* keyにopenだと、閉じる時も再生成しちゃう */}
      <UserFollowListModal
        key={String(open)}
        userId={userProfile.user.id}
        open={open}
        onClose={() => setOpen(false)}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}
