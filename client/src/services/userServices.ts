import axios from 'axios'
import {
  ForgetPasswordType,
  UserLogin,
  UserRegister,
  ResetPasswordType,
  VerifyUserType,
} from '../types/index'

const baseUrl = 'http://localhost:4000/api/users/'
axios.defaults.withCredentials = true

export const registerUser = async (user: UserRegister) => {
  const response = await axios.post(`${baseUrl}register`, user)
  return response.data
}

export const verifyUser = async (user: VerifyUserType) => {
  const response = await axios.post(`${baseUrl}verify-user/:id`, user)
  return response.data
}

export const loginUser = async (user: UserLogin) => {
  const response = await axios.post(`${baseUrl}login`, user)
  return response.data
}

export const userProfile = async () => {
  const response = await axios.get(`${baseUrl}profile`, {
    withCredentials: true,
  })
  return response.data
}

export const forgetPassword = async (user: ForgetPasswordType) => {
  const response = await axios.post(`${baseUrl}forget-password`, user)
  return response.data
}

export const resetPassword = async (user: ResetPasswordType) => {
  const response = await axios.post(`${baseUrl}reset-password`, user)
  return response.data
}

export const updateUser = async (user: UserLogin) => {
  const response = await axios.post(`${baseUrl}login`, user)
  return response.data
}
