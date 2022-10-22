export type Post = {
  id: string
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
  bookmark?: {
    id: string
  }
}

export type MyPosts = {
  user: {
    id: string
    username: string
  }
  posts: Post[]
}

export type PostRequestParams = {
  comment: string
  url: string
  published: boolean
  evaluation: number
}
