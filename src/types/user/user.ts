// ユーザー情報更新
export type User = {
  id: number
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export type UserWithToken = User & { token: string }
