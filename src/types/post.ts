import { User } from './user'

export type Post = {
  id: string
  comment: string
  url: string
  published: boolean
  evaluation: number
  userId: number
  createdAt: string
  updatedAt: string
  user: Pick<User, 'id' | 'username'>
  metaInfo: {
    image: string | undefined
    title: string
  }
  replyComments: {
    id: number
    body: string
    user: Pick<User, 'id' | 'username'>
  }[]
  bookmark?: {
    id: string
  }
}

export type PostRequestParams = {
  comment: string
  url: string
  published: boolean
  evaluation: number
}
