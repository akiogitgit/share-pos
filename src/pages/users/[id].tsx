import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineUser as AiOutlineUserIcon } from 'react-icons/ai'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useGetApi } from 'hooks/useApi'
import { Post } from 'types/post'
import { User } from 'types/user/user'

type UserParams = {
  user: Pick<User, 'id' | 'username'>
  posts: Post[]
}

const User: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: user } = useGetApi<User>('/users/me')
  const { data: userPosts } = useGetApi<UserParams>(`/users/${id}`)

  const [selectedPublished, setSelectedPublished] = useState(true)

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
          <button className='bg-red-500 rounded-10px text-white py-1 px-2'>
            フォローする
          </button>
        </div>
        <ul className='flex mt-4 gap-3'>
          <li>
            フォロワー数 : <span className='font-bold'>56</span>
          </li>
          <li>
            投稿数 :{' '}
            <span className='font-bold'>{userPosts?.posts.length}</span>
          </li>
        </ul>
      </section>

      <section className='mt-10'>
        <div className='ml-4'>
          <h1 className='font-bold text-2xl'>共有した記事</h1>
          {userPosts?.posts.length && (
            <div className='mt-4'>
              <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'>
                {userPosts.posts.map((post) => (
                  <div key={post.id} className='mb-1'>
                    <PostItem post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
