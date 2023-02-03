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

export type UserProfile = {
  user: Pick<User, 'id' | 'username'>
  isFollowed: boolean
  followerCount: number
  followingCount: number
  posts: Post[]
}

// UserCardで使う
export type UserInfo = Pick<User, 'id' | 'username'> & { isFollowed: boolean }
