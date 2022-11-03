import { useState } from 'react'

interface IRegister {
  name: string
  email: string
  phone: string
  password: string
}

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(user)
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
          <button type='submit'>Sign in</button>
        </div>
      </form>
    </div>
  )
}
export default Register
