import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Error from '../pages/Error'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default Index
