import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

const ForgetPassword = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
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
      const response = await axios.post('http://localhost:4000/api/users/forget-password', user)
      setModalText(response.data.message)
      setIsModalOpen(true)
      setResponseStatus(true)
      navigate('/reset-password')
    } catch (error: any) {
      setModalText(error.response.message)
      setIsModalOpen(true)
      setResponseStatus(false)
    }
  }

  const closeModal = () => {
    return setIsModalOpen(false)
  }

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <br />
        <input
          type='email'
          name='email'
          id='email'
          value={user.email}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <div>
          <button type='submit'>SUBMIT</button>
        </div>
      </form>
      {isModalOpen && (
        <Modal modalText={modalText} closeModal={closeModal} responseStatus={responseStatus} />
      )}
    </div>
  )
}

export default ForgetPassword
