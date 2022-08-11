export type AuthInfo = {
  token: string
}

export type LoginRequestParams = {
  email: string
  password: string
}

export type User = {
  email: string
  password: string
  createdAt: string
  id: string
  passwordDigest: string // ?
  token: string
  updatedAt: string
  username: string
}
