import axios from 'axios'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
// import { userProfile } from '../services/userServices'
import { UserProfile } from '../types'

const Profile = () => {
  const [user, setUser] = useState<UserProfile>()
  const sendRequest = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/profile', {
        withCredentials: true,
      })
      setUser(response.data.user)
      return response.data
      // const response = await userProfile()
      // setUser(response.data.user)
      // return response.data
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <div>
      <div>
        <Toaster position='top-center' reverseOrder={false} />
      </div>

      <div>
        <h1>User Profile</h1>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.phone}</p>
      </div>

      <div>
        <button>Edit Account</button>
        <button>Delete Account</button>
      </div>
    </div>
  )
}
export default Profile
