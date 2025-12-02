"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserAppointments } from "../../redux/slices/appointmentSlice";

export default function MyAppointments() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { myAppointments } = useSelector((state) =>state.appointments);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserAppointments(user.id));
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      <div className="space-y-4">
        {myAppointments.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded shadow">
            <p className="font-bold">Property ID: {a.propertyId}</p>
            <p>Date: {a.date}</p>
            <p>Status: {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
