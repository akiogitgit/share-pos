import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/PostItem'
import { UserProfile } from 'components/user/UserProfile'
import { useGetApi } from 'hooks/useApi'
import { User, UserProfile as UserProfileType } from 'types/user'

const tabs = ['公開', '非公開'] as const

const User: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [selected, setSelected] = useState<(typeof tabs)[number]>('公開')

  const { data: currentUser } = useGetApi<User>('/users/me')
  const { data: userProfile } = useGetApi<UserProfileType>(`/users/${id}`)

  const isMyPage: boolean = useMemo(
    () => currentUser?.id === Number(id),
    [currentUser?.id, id],
  )

  if (!userProfile) {
    return (
      <Layout>
        <div>このページは存在しません</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <UserProfile userProfile={userProfile} isMyPage={isMyPage} />
      <section className='mt-10'>
        {isMyPage && (
          <div className='border-b flex border-gray-300 mt-5 w-full gap-3'>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setSelected(tab)}
                className={`text-xl pb-1 w-50vw sm:w-100px ${
                  selected === tab &&
                  'font-bold border-b-3 border-primary-dark text-primary-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {userProfile.posts.length ? (
          <div className='flex flex-wrap mt-10 gap-4 justify-center items-start sm:justify-start'>
            {/* <div className='mt-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(291px,auto))] justify-center items-start'> */}
            {userProfile.posts.map(
              post =>
                (selected === '公開') === post.published && (
                  <PostItem post={post} key={post.id} />
                ),
            )}
          </div>
        ) : (
          ''
        )}
      </section>
    </Layout>
  )
}

export default User
