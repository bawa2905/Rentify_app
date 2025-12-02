
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:3001/appointments'

export const updateAppointment = createAsyncThunk(
  'appointments/update',
  async ({ id, patch }) => {
    const { data } = await axios.patch(`http://localhost:3001/appointments/${id}`, patch);
    return data;
  }
)

export const deleteAppointmentById = createAsyncThunk(
  'appointments/delete',
  async (id) => {
    await axios.delete(`http://localhost:3001/appointments/${id}`);
    return id;
  }
)

export const bookAppointment = createAsyncThunk(
  'appointments/book',
  async (payload) => {
    const { data } = await axios.post(API, payload)
    return data
  }
)

export const fetchUserAppointments = createAsyncThunk(
  'appointments/fetchUser',
  async (userId) => {
    const { data } = await axios.get(`${API}?userId=${userId}`)
    return data
  }
)

export const fetchOwnerAppointments = createAsyncThunk(
  'appointments/fetchOwner',
  async (ownerId) => {
    const { data } = await axios.get(`${API}?ownerId=${ownerId}`)
    return data
  }
)

export const fetchAllAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async () => {
    const { data } = await axios.get(API)
    return data
  }
)

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    list: [],
    myAppointments: [],
    ownerAppointments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(bookAppointment.fulfilled, (s, a) => {
        s.myAppointments.push(a.payload)
      })
      .addCase(fetchUserAppointments.fulfilled, (s, a) => {
        s.myAppointments = a.payload
      })
      .addCase(fetchOwnerAppointments.fulfilled, (s, a) => {
        s.ownerAppointments = a.payload
      })
      .addCase(fetchAllAppointments.fulfilled, (s, a) => {
        s.list = a.payload
      })
      // inside extraReducers builder
      .addCase(updateAppointment.fulfilled, (s, a) => {
        const idx = s.list.findIndex(x => x.id === a.payload.id)
        if (idx !== -1) s.list[idx] = a.payload
        // also update myAppointments / ownerAppointments if present
        s.myAppointments = s.myAppointments.map(x => x.id === a.payload.id ? a.payload : x)
        s.ownerAppointments = s.ownerAppointments.map(x => x.id === a.payload.id ? a.payload : x)
      })
      .addCase(deleteAppointmentById.fulfilled, (s, a) => {
        s.list = s.list.filter(x => x.id !== a.payload)
        s.myAppointments = s.myAppointments.filter(x => x.id !== a.payload)
        s.ownerAppointments = s.ownerAppointments.filter(x => x.id !== a.payload)
      })

  }
})

export default appointmentSlice.reducer
