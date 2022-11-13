import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { validationSchema } from '../validator/registration.schema'
import { UserRegister } from '../types/index'
import { registerUser } from '../services/userServices'

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
  min-height: 40vh;
  min-width: 40vh;
  display: flex;
  flex-direction: column;
  gap: 1;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 20px;
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

const Register = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: async (values: UserRegister, { resetForm }) => {
      try {
        const response = await registerUser(values)
        toast.success(response.message)
        resetForm({})
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
  })

  return (
    <Container>
      <div>
        <Toaster position='top-center' reverseOrder={false} />
      </div>

      <h1>Sign Up</h1>
      <Form onSubmit={formik.handleSubmit}>
        <FormBox>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            name='name'
            id='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? <Span>{formik.errors.name}</Span> : null}
        </FormBox>

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
          <Label htmlFor='phone'>Phone</Label>
          <Input
            type='tel'
            name='phone'
            id='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone ? <Span>{formik.errors.phone}</Span> : null}
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

        <FormBox>
          <Label htmlFor='password'>Confirm Password</Label>
          <Input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <Span>{formik.errors.confirmPassword}</Span>
          ) : null}
        </FormBox>

        <div>
          <Button type='submit'>SIGN UP</Button>
        </div>
      </Form>
    </Container>
  )
}
export default Register
