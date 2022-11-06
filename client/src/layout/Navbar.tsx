import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { logout } from '../features/userSlice'

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: bold;
  height: 6vh;
  background-color: #f4f2f2;
`

const Navbar = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/logout', {
        withCredentials: true,
      })
      if (response.status === 200) {
        dispatch(logout())
        navigate('/login')
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <NavBar>
      <Link style={{ textDecoration: 'none', color: 'teal' }} to='/'>
        Home
      </Link>
      <Link style={{ textDecoration: 'none', color: 'teal' }} to='/contact'>
        Contact
      </Link>
      {!isLoggedIn && (
        <>
          <Link style={{ textDecoration: 'none', color: 'teal' }} to='/register'>
            Register
          </Link>
          <Link style={{ textDecoration: 'none', color: 'teal' }} to='/login'>
            Login
          </Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link
            style={{ textDecoration: 'none', color: 'teal' }}
            to='/logout'
            onClick={handleLogout}
          >
            Logout
          </Link>
          <Link style={{ textDecoration: 'none', color: 'teal' }} to='/profile'>
            Profile
          </Link>
        </>
      )}
    </NavBar>
  )
}

export default Navbar
