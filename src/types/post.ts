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
    id: number
    username: string
  }
  metaInfo: {
    image: string | undefined
    title: string
  }
  bookmark?: {
    id: number
  }
}

export type MyPosts = {
  user: {
    id: number
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
