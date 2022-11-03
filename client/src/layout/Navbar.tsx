import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to='/' className='navlink'>
        Home
      </Link>
      <Link to='/register' className='navlink'>
        Register
      </Link>
      <Link to='/login' className='navlink'>
        Login
      </Link>
    </nav>
  )
}
export default Navbar
