import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://localhost:4000';

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId) => {
    const res = await fetch(`${API}/invoices?userId=${userId}`);
    const bookings = await res.json();
    return bookings;
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ eventId, userId, count, totalRs }) => {
    const booking = {
      eventId,
      userId,
      count,
      totalRs,
      date: new Date().toISOString().split('T')[0]
    };

    const bookingRes = await fetch(`${API}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });
    const newBooking = await bookingRes.json();

    // Update seat availability
    const seatRes = await fetch(`${API}/seats?eventId=${eventId}`);
    const seatData = await seatRes.json();
    const seatId = seatData[0].id;
    const available = seatData[0].available - count;

    await fetch(`${API}/seats/${seatId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available })
    });

    return newBooking;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookingsSlice.reducer;