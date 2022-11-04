import axios from 'axios'
import { useState } from 'react'
import Modal from '../components/Modal'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
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
      const response = await axios.post('http://localhost:4000/api/users/register', user)
      setModalText(response.data.message)
      setIsModalOpen(true)
      setResponseStatus(true)
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            value={user.name}
            onChange={handleInputChange}
            placeholder='Full Name'
          />
        </div>
        <br />

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
        <br />

        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='tel'
            name='phone'
            id='phone'
            value={user.phone}
            onChange={handleInputChange}
            placeholder='Phone'
          />
        </div>
        <br />

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
        <br />

        <div>
          <button type='submit'>Sign Up</button>
        </div>
      </form>
      {isModalOpen && (
        <Modal modalText={modalText} closeModal={closeModal} responseStatus={responseStatus} />
      )}
    </div>
  )
}
export default Register
