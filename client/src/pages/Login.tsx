import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/userSlice'
import { validationSchema } from '../validator/login.schema'
import { UserLogin } from '../types'
import { loginUser } from '../services/userServices'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-top: 120px;
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

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
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

const Span = styled.span`
  color: red;
  font-size: 0.8rem;
  padding: 5px;
`

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (user: UserLogin, { resetForm }) => {
      try {
        const response = await loginUser(user)
        toast.success(response.message)
        dispatch(login())
        navigate('/profile')
      } catch (error: any) {
        toast.error(error.response.data.message)
        resetForm({})
      }
    },
  })

  return (
    <Container>
      <div>
        <Toaster position='top-center' reverseOrder={false} />
      </div>

      <h1>User Login</h1>
      <Form onSubmit={formik.handleSubmit}>
        <FormBox>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? <Span>{formik.errors.email}</Span> : null}
        </FormBox>

        <FormBox>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <Span>{formik.errors.password}</Span>
          ) : null}
        </FormBox>

        <div>
          <Button type='submit'>LOGIN</Button>
        </div>

        <div>
          <Link to='/forget-password'>Forget Password?</Link>
        </div>
      </Form>
    </Container>
  )
}
export default Login
