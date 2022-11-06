import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Contact from '../pages/Contact'
import Error from '../pages/Error'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'

const Index = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {!isLoggedIn && (
          <>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </>
        )}
        {isLoggedIn && <Route path='/profile' element={<Profile />}></Route>}
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default Index
