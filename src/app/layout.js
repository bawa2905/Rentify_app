import { Inter } from 'next/font/google';
// import { defaultMetadata } from './metadata';
import Providers from '../components/Providers';
import Header from '../components/common/Header';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header/>
          <main className="min-h-screen bg-gray-50 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Event Hub</h3>
                  <p className="text-gray-300">Your premier platform for discovering and booking amazing events.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="/properties" className="hover:text-white">Recent</a></li>
                    <li><a href="/upcoming-events" className="hover:text-white">Top</a></li>
                    <li><a href="/my-bookings" className="hover:text-white">My Appointment</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Email: contact@eventhub.com</li>
                    <li>Phone: +1 (555) 123-4567</li>
                    <li>Address: 123 Event Street, City, Country</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                <p>&copy; {new Date().getFullYear()} Event Hub. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
