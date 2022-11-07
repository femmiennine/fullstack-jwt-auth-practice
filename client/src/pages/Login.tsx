import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch } from '../app/hooks'
import Modal from '../components/Modal'
import { login } from '../features/userSlice'

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
  background-color: white;
  color: white;
  min-height: 25vh;
  min-width: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
`

const Input = styled.input`
  margin-left: 5px;
  width: 38vh;
  height: 3vh;
  font-size: 1rem;
  letter-spacing: 1.5px;
  border: 1px solid grey;
  border-radius: 5px;
`
const Label = styled.label`
  color: Grey;
  margin-left: 5px;
`

const Button = styled.button`
  background-color: #da2a47;
  color: white;
  border-radius: 5px;
  width: 39vh;
  height: 5vh;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1.5px;
`

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
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
      dispatch(login())
      navigate('/profile')
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
    <Container>
      <h1>User Login</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='email'>Email</Label>
          <br />
          <Input
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <br />
          <Input
            type='password'
            name='password'
            id='password'
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button type='submit'>LOGIN</Button>
        </div>

        <div>
          <Link to='/forget-password'>Forget Password?</Link>
        </div>
      </Form>
      {isModalOpen && (
        <Modal modalText={modalText} closeModal={closeModal} responseStatus={responseStatus} />
      )}
    </Container>
  )
}
export default Login
