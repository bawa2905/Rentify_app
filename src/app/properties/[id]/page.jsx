'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '../../../context/AuthContext'

export default function PropertyDetail({ params }){
  const { user } = useAuth()
  const { id } =React.use(params)
  const [p,setP]=useState(null)
  const router = useRouter()
  // useEffect(() => {
  //   const checkBookingStatus = async () => {
  //     if (!user) return
     
  //   }

  //   checkBookingStatus()
  // }, [user])
  useEffect(()=>{ axios.get(`http://localhost:3001/properties/${id}`).then(r=>setP(r.data)) },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // if (!user) {
    //   router.push(`/login?next=/properties/${id}/book`)
    //   return
    // }
     if (!user) {
      alert("Please login first!");
      return router.push("/login");
    }
    router.push(`http://localhost:3000/properties/${id}/book`)
   

    // try {
    //   setLoading(true)
    //   setError('')
    //   setSuccess('')
      
    //   const bookingResponse = await fetch('/api/appointments', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       eventId,
    //       userId: user.id,
    //       count,
    //       totalRs: count * ticketPrice,
    //       date: new Date().toISOString().split('T')[0],
    //       status: 'confirmed'
    //     })
    //   })

    //   if (!bookingResponse.ok) {
    //     throw new Error('Booking failed. Please try again.')
    //   }

    //   setSuccess('Booking successful! Redirecting to your bookings...')
    //   setTimeout(() => {
    //     router.push('/appointments')
    //     router.refresh()
    //   }, 2000)
      
    // } catch (err) {
    //   setError(err.message || 'Something went wrong')
    // } finally {
    //   setLoading(false)
    // }
  }

  if(!p) return <p>Loading...</p>
  return (
    <div className="bg-white p-6 rounded shadow">
      <Image src={p.image || '/placeholder.png'} width={800} height={400} alt="p" className="rounded mb-4 object-cover"/>
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <p className="text-gray-600">{p.city}</p>
      <p className="mt-3">{p.description}</p>
      <p className="font-bold mt-3">₹{p.price}/month</p>
      <button onClick={handleSubmit} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Book Appointment</button>
    </div>
  )
}
