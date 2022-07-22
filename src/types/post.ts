export type Post = {
  id: number
  comment: string
  url: string
  published: boolean
  evaluation: number
  userId: number
  createdAt: string
  updatedAt: string
  user: {
    username: string
  }
  metaInfo: {
    image: string
    title: string
  }
}

export type PostCreateParams = {
  comment: string
  url: string
  published: boolean
  evaluation: number
}
