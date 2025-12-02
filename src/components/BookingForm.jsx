'use client'
import { useState } from 'react'

export default function BookingForm({ onSubmit }) {
  const [date, setDate] = useState('')

  function submit(e){
    e.preventDefault()
    if(!date) return alert('Please select a date')
    onSubmit(date)
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium">Date</span>
        <input aria-label="date" type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-1 block w-full border p-2 rounded"/>
      </label>

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Book</button>
    </form>
  )
}
