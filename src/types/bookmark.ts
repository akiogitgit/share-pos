import { Post } from './post'

export type Folder = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  userId: number
}

export type BookmarkPosts = {
  id: string
  name: string
  posts: Post[] // bookmark.idあり
}
