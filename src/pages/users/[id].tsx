import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/PostItem'
import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { useGetApi } from 'hooks/useApi'
import { UserPosts } from 'types/post'
import { User } from 'types/user/user'

const User: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { data: user } = useGetApi<User>('/users/me')
  const { data: userPosts } = useGetApi<UserPosts>(`/users/${id}`)

  const [selectedPublished, setSelectedPublished] = useState(true)
  const isMyPage: boolean = user?.id === Number(id)

  if (!userPosts) {
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
              <Avatar id={Number(userPosts?.user.id)} size='xl' />
              <div>
                <h1 className='font-bold mt-2 text-2xl'>
                  {userPosts?.user.username}
                </h1>
                <div className='flex mt-4 gap-3'>
                  <p>
                    フォロワー数 : <span className='font-bold'>○</span>
                  </p>
                  <p>
                    投稿数 :{' '}
                    <span className='font-bold'>{userPosts?.posts.length}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='transform translate-y-[-42px] sm:translate-y-0'>
            {isMyPage ? (
              <Button
                radius='xs'
                variant='neumorphism'
                size='sm'
                className='whitespace-nowrap'
              >
                プロフィールを編集
              </Button>
            ) : (
              <Button
                color='accent'
                size='md'
                radius='xl'
                animate
                variant='outline'
              >
                フォローする
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className='mt-10'>
        <div className='ml-4'>
          {isMyPage && (
            <div className='border-b flex border-gray-300 mt-5 w-full gap-3'>
              {[
                { label: '公開', published: true },
                { label: '非公開', published: false },
              ].map(tab => (
                <button
                  key={tab.label}
                  onClick={() => setSelectedPublished(tab.published)}
                  className={`text-lg pb-1 w-50vw sm:w-100px ${
                    selectedPublished === tab.published &&
                    'font-bold border-b-3 border-primary-dark text-primary-dark'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {userPosts?.posts.length ? (
          <div className='flex flex-wrap mt-10 gap-4 justify-center items-start sm:justify-start'>
            {/* <div className='mt-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(291px,auto))] justify-center items-start'> */}
            {userPosts.posts.map(
              post =>
                selectedPublished === post.published && (
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

// SSRにする
// export const getStaticPaths: GetStaticPaths = async () => {
//   // userの数だけidを生成したい users#index に認証必要だから、fetch出来ぬ
//   // const path = await fetch('https://share-pos.herokuapp.com/api/v1/users')
//   // const authHeader = useAuthHeaderParams()
//   return {
//     paths: [
//       { params: { id: '1' } },
//       { params: { id: '2' } },
//       { params: { id: '3' } },
//     ],
//     fallback: false, // 上記以外のパスでアクセスした場合は 404 ページにする
//   }
// }

// type PathProps = {
//   id: string
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params as PathProps

//   const authHeader = useAuthHeaderParams()
//   const { data: user } = useGetApi<UserParams>(`/users/${id}`, {}, authHeader)
//   return { props }
// }
