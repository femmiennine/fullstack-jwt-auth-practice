import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: bold;
  margin-top: 20px;
`

const Navbar = () => {
  return (
    <NavBar>
      <Link style={{ textDecoration: 'none', color: 'teal' }} to='/'>
        Home
      </Link>
      <Link style={{ textDecoration: 'none', color: 'teal' }} to='/register'>
        Register
      </Link>
      <Link style={{ textDecoration: 'none', color: 'teal' }} to='/login'>
        Login
      </Link>
      <Link style={{ textDecoration: 'none', color: 'teal' }} to='/profile'>
        Profile
      </Link>
    </NavBar>
  )
}
export default Navbar
