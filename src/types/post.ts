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
    image: string | undefined
    title: string
  }
}

export type PostRequestParams = {
  comment: string
  url: string
  published: boolean
  evaluation: number
}
