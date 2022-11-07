import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineUser as AiOutlineUserIcon } from 'react-icons/ai'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { Button } from 'components/shares/Button'
import { useGetApi } from 'hooks/useApi'
import { UserPosts } from 'types/post'
import { User } from 'types/user/user'

const User: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
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
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <AiOutlineUserIcon className='transform scale-200' />
            <h1 className='font-bold text-xl'>
              <h1>{userPosts?.user.username}</h1>
            </h1>
          </div>
          <Button radius='md'>
            {isMyPage ? 'ユーザー情報を編集' : 'フォローする'}
          </Button>
        </div>

        <div className='flex mt-4 gap-3'>
          <p>
            フォロワー数 : <span className='font-bold'>○○</span>
          </p>
          <p>
            投稿数 :{' '}
            <span className='font-bold'>{userPosts?.posts.length}</span>
          </p>
        </div>
      </section>

      <section className='mt-10'>
        <div className='ml-4'>
          <h1 className='font-bold text-2xl'>シェアした記事</h1>

          {isMyPage && (
            <div className='border-b flex border-gray-300 h-30px mt-5 w-full gap-3'>
              {[
                { label: '公開している投稿', published: true },
                { label: '非公開の投稿', published: false },
              ].map(tab => (
                <button
                  key={tab.label}
                  onClick={() => setSelectedPublished(tab.published)}
                  className={`${
                    selectedPublished === tab.published
                      ? 'font-bold border-b-2 border-primary text-primary'
                      : ' cursor-pointer'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {userPosts?.posts.length ? (
          <div className='flex flex-wrap mt-4 gap-4 justify-center items-start sm:justify-start'>
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
