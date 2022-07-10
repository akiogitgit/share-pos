// signUp, Login の型を定義

export type SignUpFormParams = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export type SignUpRequestParams = Omit<SignUpFormParams, 'passwordConfirmation'>
