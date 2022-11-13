import axios from 'axios'
import { UserLogin, UserRegister } from '../types/index'

const baseUrl = 'http://localhost:4000/api/users/'

export const registerUser = async (user: UserRegister) => {
  const response = await axios.post(`${baseUrl}register`, user)
  return response.data
}

export const loginUser = async (user: UserLogin) => {
  const response = await axios.post(`${baseUrl}login`, user)
  return response.data
}
