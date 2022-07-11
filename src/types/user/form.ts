// signUp, Login の型を定義

export type SignUpFormParams = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export type SignUpRequestParams = Omit<SignUpFormParams, 'passwordConfirmation'>

export type SignUpResponseParams = {
  allow_password_change: boolean
  created_at: string
  email: string
  id: number
  provider: string
  uid: string
  updated_at: string
  username: string
}
