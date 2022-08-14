import { NextPage } from 'next'
import { useState } from 'react'
import { PostItem } from 'components/post/PostItem'
import { PostItemList } from 'components/post/PostItemList'
import { Layout } from 'components/shared/Layout'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
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

type SelectedMenu = 'myPosts' | 'bookmark'

const MyPage: NextPage = () => {
  useRequireLogin()

  // const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>('myPosts')
  const [selectedMenu, setSelectedMenu] = useState('ユーザー情報')
  const [selectedPublished, setSelectedPublished] = useState(true)
  const { cookies } = useCookies('userInfo')
  const authHeaderParams = useAuthHeaderParams()

  const { data: myPosts, mutate } = useGetApi<MyPosts>(
    `/users/${cookies.userInfo?.id}`,
    undefined,
    authHeaderParams,
  )

  const tabs = ['ユーザー情報', '投稿した記事', 'ブックマーク']
  // const tabs = [
  //   { name: 'ユーザー情報', details: [] },
  //   { name: '投稿した記事', details: ['公開', '非公開'] },
  //   {
  //     name: 'ブックマーク',
  //     // details: ['フォルダ１', 'フォルダ２', 'フォルダ3'],
  //     details: [
  //       { id: 1, name: 'フォルダ1' },
  //       { id: 2, name: 'フォルダ2' },
  //       { id: 3, name: 'フォルダ3' },
  //     ],
  //   },
  // ]
  console.log(myPosts)

  return (
    <Layout>
      <div className='sm:(flex gap-10) '>
        <nav className='flex text-center justify-center sm:gap-2 sm:(justify-start flex-col) '>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setSelectedMenu(tab)}
              className={`sm:p-4 font-bold w-30vw max-w-130px h-60px ${
                selectedMenu === tab
                  ? 'bg-red-500 rounded-10px text-white'
                  : ' cursor-pointer'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className='mt-4 w-full'>
          {selectedMenu === 'ユーザー情報' && (
            <div>
              <div className='mx-4'>
                <h1 className='font-bold text-2xl'>ユーザー情報</h1>
                <div className='flex justify-end'>
                  <button className='bg-red-500 rounded-10px text-white py-1 px-2'>
                    登録情報を編集
                  </button>
                </div>
                <ul className='mt-4'>
                  <li>ユーザー名： あきお</li>
                  <li>Eメール　 ： あきお</li>
                  <li>投稿数　： あきお</li>
                  <li>フォルダ数： あきお</li>
                  <li>フォルダ数： あきお</li>
                </ul>
              </div>
            </div>
          )}

          {selectedMenu === '投稿した記事' && (
            <div>
              <div className='ml-4 sm:ml-0'>
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

              <ul className='mt-4'>
                {myPosts?.posts.length && (
                  <PostItemList className='flex flex-wrap justify-center sm:justify-start'>
                    {myPosts.posts.map(
                      (post, i) =>
                        selectedPublished === post.published && (
                          <PostItem post={post} key={i} className='m-2' />
                        ),
                    )}
                  </PostItemList>
                )}
              </ul>
            </div>
          )}

          {selectedMenu === 'ブックマーク' && (
            <div>
              <div className='ml-4 sm:ml-0'>
                <h1 className='font-bold text-2xl'>ブックマーク</h1>
                <div className='border-b flex border-gray-300 h-30px mt-5 w-full gap-3'>
                  {[
                    { label: 'フォルダ１', published: true },
                    { label: 'フォルダ２', published: false },
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

              <ul className='mt-4'>
                {myPosts?.posts.length && (
                  <PostItemList className='flex flex-wrap justify-center sm:justify-start'>
                    {myPosts.posts.map(
                      (post, i) =>
                        selectedPublished === post.published && (
                          <PostItem post={post} key={i} className='m-2' />
                        ),
                    )}
                  </PostItemList>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default MyPage
