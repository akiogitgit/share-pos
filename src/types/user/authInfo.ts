export type AuthInfo = {
  'access-token': string
  client: string
  uid: string
  expiry: string
}

export type LoginRequestParams = {
  email: string
  password: string
}
