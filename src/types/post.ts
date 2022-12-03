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
    id: number
    username: string
  }
  metaInfo: {
    image: string | undefined
    title: string
  }
  replyComments: {
    id: number
    body: string
    user: {
      id: number
      username: string
    }
  }[]
  bookmark?: {
    id: string
  }
}

export type UserPosts = {
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
