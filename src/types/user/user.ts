import { Post } from 'types/post'

// ユーザー情報更新
export type User = {
  id: number
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export type UserWithToken = User & { token: string }

export type UserInfo = {
  user: Pick<User, 'id' | 'username'>
  posts: Post[]
  isFollowed: boolean
  followerCount: number
  followingCount: number
}

export type OtherUser = Pick<User, 'id' | 'username'> & { isFollowed: boolean }
