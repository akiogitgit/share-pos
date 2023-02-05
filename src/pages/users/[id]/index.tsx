import { NextPage } from 'next'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Layout } from 'components/layout/Layout'
import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { UserPosts } from 'components/user/UserPosts'
import { useGetApi } from 'hooks/useApi'
import { useFollow } from 'hooks/useFollow'
import { User, UserProfile } from 'types/user/user'

const User: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data: currentUser } = useGetApi<User>('/users/me')
  const { data: userProfile } = useGetApi<UserProfile>(`/users/${id}`)
  const { follow, unFollow } = useFollow(userProfile?.user.id || 0)

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
                  <Link href={`/users/${userProfile.user.id}/followings`}>
                    <span className='font-bold'>
                      {userProfile.followingCount}
                    </span>{' '}
                    <span className='text-gray-500'>フォロー</span>
                  </Link>
                  <Link href={`/users/${userProfile.user.id}/followers`}>
                    <span className='font-bold'>
                      {userProfile.followerCount}
                    </span>{' '}
                    <span className='text-gray-500'>フォロワー</span>
                  </Link>
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

      <UserPosts isMyPage={isMyPage} posts={userProfile.posts} />
    </Layout>
  )
}

export default User
