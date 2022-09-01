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
      <div>フォロワー３０人</div>
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
