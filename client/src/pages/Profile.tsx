import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.withCredentials = true

type IUser = {
  name?: string
  email?: string
  phone?: string
}

const Profile = () => {
  const [user, setUser] = useState<IUser>()
  const sendRequest = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/profile', {
        withCredentials: true,
      })
      setUser(response.data.user)
      return response.data
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.phone}</p>
    </div>
  )
}
export default Profile
