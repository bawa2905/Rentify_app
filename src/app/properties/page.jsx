// import PropertyCard from '../../components/PropertyCard'

// export const revalidate = 300

// export default async function FeaturedEventsPage({ searchParams }) {
//   const { search } = await searchParams || {};
  
 
//   const topProperties = await fetch('http://localhost:3001/top-properties').then(r => r.json())
  
//   const allProperties = await fetch('http://localhost:3001/properties').then(r => r.json())
  
// const recentProperties = await fetch('http://localhost:3001/recent-properties').then(r => r.json())

// console.log(allProperties)
// let events = allProperties
// //   let events = allProperties.filter(event => 
// //     topProperties.some(topProperty => topProperty.eventId.toString() === event.id)
// //   )

// //   if (search) {
// //     const searchLower = search.toLowerCase()
// //     events = events.filter(event =>
// //       event.title.toLowerCase().includes(searchLower) ||
// //       event.description.toLowerCase().includes(searchLower) ||
// //       event.location.toLowerCase().includes(searchLower)
// //     )
// //   }

//   return (
//     <section>
//       <h1 className="text-3xl font-bold mb-6">Properties</h1>
//       {events.length > 0 ? (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {events.map(event => (
//             <PropertyCard key={event.id} event={event} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-8">
//           <p className="text-gray-600 text-lg">
//             No events found{search ? ` matching "${search}"` : ''}
//           </p>
//         </div>
//       )}
//     </section>
//   )
// }
'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PropertyCard from '../../components/PropertyCard'

export default function PropertiesPage(){
  const [list,setList]=useState([])
  const [city,setCity]=useState('')
  const [maxPrice,setMaxPrice]=useState('')

  useEffect(()=>{ axios.get('http://localhost:3001/properties').then(r=>setList(r.data)) },[])

  const filtered = list.filter(p=> (city ? p.city.toLowerCase().includes(city.toLowerCase()) : true) && (maxPrice ? p.price <= Number(maxPrice) : true))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Browse Properties</h1>
      <div className="flex gap-3 mb-4">
        <input placeholder="City" className="border p-2 rounded" onChange={e=>setCity(e.target.value)} />
        <input placeholder="Max price" type="number" className="border p-2 rounded" onChange={e=>setMaxPrice(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(p=> <PropertyCard key={p.id} property={p} />)}
      </div>
    </div>
  )
}
