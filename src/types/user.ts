import { Post } from 'types/post'

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
  isFollowing: boolean
  followerCount: number
  followingCount: number
  posts: Post[]
}

export type UserInfo = Pick<User, 'id' | 'username'> & { isFollowing: boolean }
