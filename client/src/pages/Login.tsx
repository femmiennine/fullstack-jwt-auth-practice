import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [modalText, setModalText] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [responseStatus, setResponseStatus] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', user)
      setModalText(response.data.message)
      setIsModalOpen(true)
      setResponseStatus(true)
      navigate('/profile', { state: response.data })
    } catch (error: any) {
      setModalText(error.response.message)
      setIsModalOpen(true)
      setResponseStatus(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleInputChange}
            placeholder='Email'
          />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={user.password}
            onChange={handleInputChange}
            placeholder='Password'
          />
        </div>
        <div>
          <button type='submit'>Sign In</button>
        </div>
      </form>
      {isModalOpen && (
        <Modal modalText={modalText} closeModal={closeModal} responseStatus={responseStatus} />
      )}
    </div>
  )
}
export default Login
