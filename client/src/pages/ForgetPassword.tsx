import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { forgetPassword } from '../services/userServices'
import { ForgetPasswordType } from '../types/index'
import { validationSchema } from '../validator/forgetPassword.schema'

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
  justify-content: center;
`

const Input = styled.input`
  margin-left: 5px;
  width: 38vh;
  height: 4vh;
  font-size: 1rem;
  letter-spacing: 1.5px;
  border: 1px solid grey;
  border-radius: 5px;
  margin-bottom: 1.5rem;
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

const ForgetPassword = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (user: ForgetPasswordType, { resetForm }) => {
      try {
        const response = await forgetPassword(user)
        toast.success(response.message)
        navigate('/reset-password')
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

      <h1>Forgot Password</h1>
      <Form onSubmit={formik.handleSubmit}>
        <FormBox>
          <Label>Enter your email to reset password</Label>
          <Input
            type='email'
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? <Span>{formik.errors.email}</Span> : null}
          <div>
            <Button type='submit'>RESET PASSWORD</Button>
          </div>
        </FormBox>
      </Form>
    </Container>
  )
}

export default ForgetPassword
