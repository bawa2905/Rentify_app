'use client'

import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../../i18n/config'
import LanguageSelector from '../LanguageSelector'

export default function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const { t } = useTranslation()




  const [searchQuery, setSearchQuery] = useState(params?.get('search') || '')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && e.target.tagName !== 'INPUT') {
        e.preventDefault()
        document.getElementById('search-input')?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const currentPath = pathname || '/'
      const newParams = new URLSearchParams(params.toString())
      newParams.set('search', searchQuery.trim())
      router.push(`${currentPath}?${newParams.toString()}`)
    } else {
      const newParams = new URLSearchParams(params.toString())
      newParams.delete('search')
      const queryString = newParams.toString()
      router.push(`${pathname}${queryString ? `?${queryString}` : ''}`)
    }
  }

  const handleAuthAction = () => {
    if (user) {
      signOut()
    } else {
      router.push(`/login?next=${encodeURIComponent(pathname)}`)
    }
  }

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Rentify
          </Link>

          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link href="/properties" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
                {t('navigation.recent')}
              </Link>
              <Link href="/upcoming-events" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
                {t('navigation.top')}
              </Link>
              {user && (
                <Link href="/mybookings" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
                  {t('navigation.myAppointments')}
                </Link>
              )}
              {user?.role === 'admin' && (
                <Link href="/admin" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
                  {t('navigation.adminDashboard')}
                </Link>
              )}
            </nav>

            <form onSubmit={handleSearch} className="flex-1 w-64">
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={t('search.ariaLabel')}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <LanguageSelector />

            <button
              onClick={handleAuthAction}
              className={`px-4 py-2 rounded ${
                user
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {user ? t('auth.signOut') : t('auth.signIn')}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
