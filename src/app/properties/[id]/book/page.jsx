"use client";

import  { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { bookAppointment } from "../../../../redux/slices/appointmentSlice";
import { useRouter } from "next/navigation";

export default function BookAppointment({ params }) {
  const { id } = React.use(params);

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((s) => s.auth);

  const [property, setProperty] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/properties/${id}`).then((res) => {
      setProperty(res.data);
    });
  }, []);

  if (!property) return <p>Loading...</p>;

  function submitBooking(e) {
    e.preventDefault();

    dispatch(
      bookAppointment({
         propertyId: Number(id),
        userId: property.userId,
        ownerId: property.ownerId,       
        scheduledDate: date,
        status: "pending",
        timestamp
      })
    );

    alert("Appointment booked!");

    router.push("/appointments");
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Book Appointment</h1>

      <p className="mb-2 font-semibold">{property.title}</p>

      <form className="space-y-3" onSubmit={submitBooking}>
        <input
          type="date"
          className="border w-full p-2 rounded"
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
