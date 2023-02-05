import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'

import { useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { Modal } from 'components/shares/base/Modal'
import { UserCard } from 'components/user/UserCard'
import { UserPosts } from 'components/user/UserPosts'
import { useGetApi } from 'hooks/useApi'
import { useFollow } from 'hooks/useFollow'
import { User, UserInfo, UserProfile } from 'types/user/user'

const User: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data: currentUser } = useGetApi<User>('/users/me')
  const { data: userProfile } = useGetApi<UserProfile>(`/users/${id}`)
  const { follow, unFollow } = useFollow(userProfile?.user.id || 0)

  // モーダル
  const [opened, setOpened] = useState(false)
  // モーダルで表示のがフォロワー一覧
  const [isShowFollowers, setIsShowFollowers] = useState(true)
  const { data: followers, mutate: mutateFollowers } = useGetApi<UserInfo[]>(
    `/users/${id}/followers`,
    {
      options: { revalidateIfStale: true },
    },
  )
  const { data: followings, mutate: mutateFollowings } = useGetApi<UserInfo[]>(
    `/users/${id}/followings`,
    {
      options: { revalidateIfStale: true },
    },
  )

  const isMyPage: boolean = currentUser?.id === Number(id)

  if (!userProfile) {
    return (
      <Layout>
        <div>このページは存在しません</div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* コンポーネント分割する UserProfile */}
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
                      setOpened(true)
                      setIsShowFollowers(false)
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
                      setOpened(true)
                      setIsShowFollowers(true)
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

      {/* いい感じに共通化したい */}
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        title={
          <div className='border-b flex border-gray-300 w-full gap-3'>
            <div
              className={`cursor-pointer text-lg text-center pb-1 w-50vw ${
                !isShowFollowers &&
                'border-primary-dark border-b-3  text-primary-dark'
              }`}
              onClick={() => {
                setIsShowFollowers(false)
                mutateFollowings(followings)
              }}
            >
              フォロー一覧
            </div>
            <div
              className={`cursor-pointer text-lg text-center pb-1 w-50vw ${
                isShowFollowers &&
                'border-primary-dark border-b-3  text-primary-dark'
              }`}
              onClick={() => {
                setIsShowFollowers(true)
                mutateFollowers(followers)
              }}
            >
              フォロワー一覧
            </div>
          </div>
        }
        // title={
        //   <div className='border-b flex border-gray-300 w-full gap-3'>
        //     {['フォロー一覧', 'フォロワー一覧'].map(v => (
        //       <div
        //         key={v}
        //         className={`cursor-pointer text-lg text-center pb-1 w-50vw ${
        //           (v === 'フォロー一覧' && !isShowFollowers) ||
        //           (v === 'フォロワー一覧' &&
        //             isShowFollowers &&
        //             'border-primary-dark border-b-3  text-primary-dark')
        //         }`}
        //         onClick={() =>
        //           v === 'フォロー一覧'
        //             ? setIsShowFollowers(false)
        //             : setIsShowFollowers(true)
        //         }
        //       >
        //         {v}
        //       </div>
        //     ))}
        //   </div>
        // }
      >
        <div className='bg-white rounded-lg flex flex-col p-8 gap-8'>
          {isShowFollowers
            ? followers?.length
              ? followers.map(user => (
                  <UserCard
                    key={`${user.id} ${user.isFollowing}`}
                    {...user}
                    currentUserId={currentUser?.id}
                    onClickUser={() => setOpened(false)}
                  />
                ))
              : 'フォロワーはいません'
            : followings?.length
            ? followings.map(user => (
                <UserCard
                  key={`${user.id} ${user.isFollowing}`}
                  {...user}
                  currentUserId={currentUser?.id}
                  onClickUser={() => setOpened(false)}
                />
              ))
            : 'フォローしているユーザーはいません'}
        </div>
      </Modal>

      {/* 逆にこっちはコンポーネント分割いらない
      stateが、公開・非公開くらいしかない
       */}
      <UserPosts isMyPage={isMyPage} posts={userProfile.posts} />
    </Layout>
  )
}

export default User
