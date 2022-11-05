import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Modal from '../components/Modal'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-top: 100px;
`

const Form = styled.form`
  background-color: teal;
  color: white;
  height: 30vh;
  width: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-radius: 10px;
`

const Input = styled.input`
  margin-left: 5px;
  width: 38vh;
  height: 100%;
`
const Register = () => {
  const navigate = useNavigate()
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
      navigate('/login')
    } catch (error: any) {
      console.log(error.response.message)
      setModalText(error.response.message)
      setIsModalOpen(true)
      setResponseStatus(false)
    }
  }

  const closeModal = () => {
    return setIsModalOpen(false)
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <label hidden htmlFor='name'>
            Name:
          </label>
          <Input
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
          <label hidden htmlFor='email'>
            Email:
          </label>
          <Input
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
          <label hidden htmlFor='phone'>
            Phone:
          </label>
          <Input
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
          <label hidden htmlFor='password'>
            Password:
          </label>
          <Input
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
      </Form>
      {isModalOpen && (
        <Modal modalText={modalText} closeModal={closeModal} responseStatus={responseStatus} />
      )}
    </Container>
  )
}
export default Register
