import { Res } from './response'

export type Post = {
  id: number
  comment: string
  url: string
  published: boolean
  evaluation: number
  userId: number
  createdAt: string
  updatedAt: string
}

export type PostResponse = Res<Post>

export type PostCreateParams = {
  comment: string
  url: string
  published: boolean
  evaluation: number
}
