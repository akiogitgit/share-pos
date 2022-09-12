import { NextPage } from 'next'
import { useState } from 'react'

import { AiOutlineUser as AiOutlineUserIcon } from 'react-icons/ai'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'

type MyPosts = {
  user: {
    id: number
    username: string
  }
  posts: Post[]
}

const MyPage: NextPage = () => {
  const [selectedPublished, setSelectedPublished] = useState(true)
  const { cookies } = useCookies('userInfo')
  const authHeaderParams = useAuthHeaderParams()
  const { data: myPosts } = useGetApi<MyPosts>(
    `/users/${cookies.userInfo?.id}`,
    undefined,
    authHeaderParams,
  )

  return (
    <Layout>
      <section className='ml-4'>
        <h1 className='font-bold text-2xl'>ユーザー情報</h1>
        <div className='flex justify-end'>
          <button className='bg-red-500 rounded-10px text-white py-1 px-2'>
            登録情報を編集
          </button>
        </div>
        <div className='flex gap-3 items-center'>
          <AiOutlineUserIcon className='transform scale-200' />
          <h1 className='font-bold text-xl'>あきお</h1>
        </div>
        <ul className='flex mt-4 gap-3'>
          <li>
            フォロワー数 : <span className='font-bold'>56</span>
          </li>
          <li>
            投稿数 : <span className='font-bold'>20</span>
          </li>
        </ul>
      </section>

      <section className='mt-10'>
        <div className='ml-4'>
          <h1 className='font-bold text-2xl'>投稿した記事</h1>
          <div className='border-b flex border-gray-300 h-30px mt-5 w-full gap-3'>
            {[
              { label: '公開している投稿', published: true },
              { label: '非公開の投稿', published: false },
            ].map((tab, i) => (
              <button
                key={i}
                onClick={() => setSelectedPublished(tab.published)}
                className={`${
                  selectedPublished === tab.published
                    ? 'font-bold border-b-2 border-red-500 text-red-500'
                    : ' cursor-pointer'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {myPosts?.posts.length && (
          <div className='flex flex-wrap mt-4 gap-4 justify-center items-start sm:justify-start'>
            {/* <div className='mt-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(291px,auto))] justify-center items-start'> */}
            {myPosts.posts.map(
              (post, i) =>
                selectedPublished === post.published && (
                  <PostItem post={post} key={i} />
                ),
            )}
          </div>
        )}
      </section>
    </Layout>
  )
}

export default MyPage
