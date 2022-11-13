export type IUserData = {
  name: string
  email: string
  phone: string
  password: string
}

export type IUserLogin = {
  email: string
  password: string
}

export type UserRegister = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}
