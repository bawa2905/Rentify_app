
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:3001/properties'

export const fetchProperties = createAsyncThunk(
  'properties/fetch',
  async () => {
    const { data } = await axios.get(API)
    return data
  }
)

export const fetchOwnerProperties = createAsyncThunk(
  'properties/fetchOwner',
  async (ownerId) => {
    const { data } = await axios.get(`${API}?ownerId=${ownerId}`)
    return data
  }
)

export const addProperty = createAsyncThunk(
  'properties/add',
  async (payload) => {
    const { data } = await axios.post(API, payload)
    return data
  }
)

export const verifyProperty = createAsyncThunk(
  'properties/verify',
  async ({ id, verified }) => {
    const { data } = await axios.patch(`${API}/${id}`, { verified })
    return data
  }
)

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    list: [],
    ownerList: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch all properties
      .addCase(fetchProperties.pending, (s) => { s.status = 'loading' })
      .addCase(fetchProperties.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.list = a.payload
      })
      .addCase(fetchProperties.rejected, (s, a) => {
        s.status = 'failed'
        s.error = a.error.message
      })

      // Owner properties
      .addCase(fetchOwnerProperties.fulfilled, (s, a) => {
        s.ownerList = a.payload
      })

      // Add new listing
      .addCase(addProperty.fulfilled, (s, a) => {
        s.list.push(a.payload)
      })

      // Verify property (admin)
      .addCase(verifyProperty.fulfilled, (s, a) => {
        const index = s.list.findIndex(p => p.id === a.payload.id)
        if (index !== -1) s.list[index] = a.payload
      })
  }
})

export default propertySlice.reducer
