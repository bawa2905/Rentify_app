import Link from 'next/link'
import Image from 'next/image'

export default function PropertyCard({ property }) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative w-full h-48">
        <Image
          src="https://picsum.photos/id/1054/800/600"
          alt={property?.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{property.title}</h2>
        <p className="text-gray-600 text-sm">
          {property.date} · {property.time}
        </p>
        <p className="text-gray-800 mt-2 font-medium">
          ₹{property.ticketPrice}
        </p>
      </div>
    </Link>
  )
}

