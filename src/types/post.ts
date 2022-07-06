import { Res } from './response'

export type Post = {
  id: number
  comment: string
  url: string
  published: boolean
  evaluation: number
  user_id: number
  created_at: string
  updated_at: string
}

export type PostResponse = Res<Post>

export type PostCreateParams = {
  comment: string
  url: string
  published: boolean
  evaluation: number
}
