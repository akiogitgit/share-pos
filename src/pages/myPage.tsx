import { NextPage } from 'next'
import { PostItem } from 'components/post/PostItem'
import { PostItemList } from 'components/post/PostItemList'
import { Layout } from 'components/shared/Layout'
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
  const { cookies } = useCookies('userInfo')
  const authHeaderParams = useAuthHeaderParams()

  const { data: myPosts, mutate } = useGetApi<MyPosts>(
    `/users/${cookies.userInfo?.id}`,
    undefined,
    authHeaderParams,
  )
  console.log(myPosts)

  return (
    <Layout>
      <div className='sm:(flex gap-10) '>
        <nav className='flex gap-2 sm:(w-260px flex-col) '>
          <div>記事の管理</div>
          <div>本の管理</div>
          <div>GitHub連携</div>
          <div>ライブラリ</div>
          <div>収益の管理</div>
        </nav>
        <div>
          <h1 className='text-2xl'>ライブラリ</h1>
          <div className='border-b flex w-full gap-3'>
            <div className='font-bold border-b-2 border-blue-500 text-blue-500'>
              いいねした投稿
            </div>
            <div>読んでいる本</div>
            <div>購入した本</div>
          </div>
          <ul>
            {myPosts?.posts.length && (
              <PostItemList>
                {myPosts.posts.map((post, i) => (
                  <PostItem post={post} key={i} />
                ))}
              </PostItemList>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
export default MyPage
