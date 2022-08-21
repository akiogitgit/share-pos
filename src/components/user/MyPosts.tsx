import { FC, useState } from 'react'
import { PostItem } from 'components/post/PostItem/PostItem'
import { PostItemList } from 'components/post/PostItemList'
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

export const MyPosts: FC = () => {
  const [selectedPublished, setSelectedPublished] = useState(true)
  const { cookies } = useCookies('userInfo')
  const authHeaderParams = useAuthHeaderParams()
  const { data: myPosts } = useGetApi<MyPosts>(
    `/users/${cookies.userInfo?.id}`,
    undefined,
    authHeaderParams,
  )

  return (
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
  )
}
