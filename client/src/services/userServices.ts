import axios from 'axios'
import { UserRegister } from '../types/index'

const baseUrl = 'http://localhost:4000/api/users/'

export const registerUser = async (values: UserRegister) => {
  const response = await axios.post(`${baseUrl}register`, values)
  return response.data
}
