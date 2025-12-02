import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:3001/users'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (email) => {
    const { data } = await axios.get(`${API}?email=${email}`)

    if (!data.length) throw new Error('User not found')

    const user = data[0]
    localStorage.setItem('rentify_user', JSON.stringify(user))
    return user
  }
)

const initialState = {
  user: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('rentify_user')) || null
    : null,
  status: 'idle',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      localStorage.removeItem('rentify_user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
