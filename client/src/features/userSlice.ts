import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer

// 1. Logout functionality
// 2. Manage Status
// --> isLoggedIn = false (default)
// --> login() = true -> which routes you want to show
// --> logout() = false -> which routes you want to show
// 3. protect routing
// 4. refresh token
