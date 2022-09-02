import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { PostItemList } from 'components/post/PostItemList'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
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
  const authHeader = useAuthHeaderParams()
  const { data: user } = useGetApi<UserParams>(`/users/${id}`, {}, authHeader)
  console.log(user)

  return (
    <Layout>
      <div className='flex justify-between'>
        <h1>{user?.user.username}</h1>
        <button>フォローする</button>
      </div>
      <div>フォロワー：30人</div>
      <div>投稿数：20</div>
      <div>総いいね数?：1</div>
      {user?.posts.length && (
        <PostItemList className='flex flex-wrap mt-4 gap-3 justify-center'>
          {user.posts.map((post, i) => (
            <PostItem post={post} key={i} />
          ))}
        </PostItemList>
      )}
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
