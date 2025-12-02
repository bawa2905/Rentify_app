

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </div>
    </footer>
  )
}
