import { Post } from './post'

export type Bookmark = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  userId: number
}

export type BookmarkPosts = {
  id: number
  name: string
  posts: Post[]
}
