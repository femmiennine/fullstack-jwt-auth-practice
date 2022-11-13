import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Fullname is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
})
