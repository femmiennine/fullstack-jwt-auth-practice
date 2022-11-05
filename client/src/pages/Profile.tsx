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
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas aliquam natus saepe cum
        impedit, iusto eos nisi dolorum iure rerum alias atque numquam ratione harum quos aspernatur
        dolores, et sequi velit repudiandae optio, doloribus quae? Laudantium repudiandae vero saepe
        dolor veniam quae assumenda exercitationem autem eligendi rerum. A, temporibus rem!
      </p>
    </div>
  )
}
export default Profile
