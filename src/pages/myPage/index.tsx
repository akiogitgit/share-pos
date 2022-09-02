import { NextPage } from 'next'
import { useState } from 'react'
import MyPosts from './myPosts'
import { MyPageLayout } from 'components/layout/MyPageLayout'
import { PostItem } from 'components/post/Item/PostItem'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'

const MyPage: NextPage = () => {
  useRequireLogin()
  // const tabs = ['userInfo', 'myPosts', 'bookmark']
  const [selectedPublished, setSelectedPublished] = useState(true)
  const { cookies } = useCookies('userInfo')
  const authHeaderParams = useAuthHeaderParams()
  const { data: myPosts } = useGetApi<MyPosts>(
    `/users/${cookies.userInfo?.id}`,
    undefined,
    authHeaderParams,
  )

  return (
    <MyPageLayout tabName='myPosts'>
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

      {myPosts?.posts.length && (
        <div className='flex mt-4 flex-wrap justify-center sm:justify-start'>
          {myPosts.posts.map(
            (post, i) =>
              selectedPublished === post.published && (
                <PostItem post={post} key={i} className='m-2' />
              ),
          )}
        </div>
      )}
    </MyPageLayout>
  )
}
export default MyPage
