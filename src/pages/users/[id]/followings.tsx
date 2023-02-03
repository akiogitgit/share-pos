import { NextPage } from 'next'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { BsArrowLeft as BsArrowLeftIcon } from 'react-icons/bs'

import { Layout } from 'components/layout/Layout'
import { UserCard } from 'components/user/UserCard'
import { useGetApi } from 'hooks/useApi'
import { UserInfo, User, UserProfile } from 'types/user/user'

const Followings: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data: currentUser } = useGetApi<User>('/users/me')
  const { data: userInfo } = useGetApi<UserProfile>(`/users/${id}`)
  const { data: followings } = useGetApi<UserInfo[]>(
    `/users/${id}/followings`,
    { options: { revalidateIfStale: true } },
  )

  if (!userInfo) {
    return (
      <Layout>
        <div>このページは存在しません</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='mx-auto max-w-120'>
        <div className='flex gap-3 items-center'>
          <Link href={`/users/${id}`} className='h-5'>
            <BsArrowLeftIcon className='h-5 text-gray-500 w-5' />
          </Link>
          <h1 className='text-2xl'>{userInfo?.user.username}</h1>
        </div>
        <div className='border-b flex border-gray-300 mt-8 w-full gap-3'>
          <Link
            href={`/users/${id}/followings`}
            className='border-primary-dark font-bold border-b-3 text-xl text-center 
                    text-primary-dark pb-1 w-50vw'
          >
            フォロー一覧
          </Link>
          <Link
            href={`/users/${id}/followers`}
            className='text-xl text-center pb-1 w-50vw'
          >
            フォロワー一覧
          </Link>
        </div>

        <div className='bg-white rounded-lg flex flex-col mt-8 p-8 gap-8'>
          {followings?.length
            ? followings.map(user => (
                <UserCard
                  key={user.id}
                  {...user}
                  currentUserId={currentUser?.id}
                />
              ))
            : 'フォローしているユーザーはいません'}
        </div>
      </div>
    </Layout>
  )
}

export default Followings
