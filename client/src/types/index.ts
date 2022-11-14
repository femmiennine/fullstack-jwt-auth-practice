export type UserProfile = {
  name: string
  email: string
  phone: string
  password: string
}

export type UserRegister = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type UserLogin = {
  email: string
  password: string
}

export type ForgetPasswordType = {
  email: string
}
