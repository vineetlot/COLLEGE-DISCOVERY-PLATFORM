'use client'

import { useEffect, useState } from 'react'
import CompareTable from '@/components/CompareTable'
import Link from 'next/link'

interface College {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  placements: string
}

export default function Compare() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const selectedIds = JSON.parse(localStorage.getItem('compareColleges') || '[]') as string[]
    
    if (selectedIds.length === 0) {
      setLoading(false)
      return
    }

    const fetchColleges = async () => {
      const promises = selectedIds.map(id => 
        fetch(`/api/colleges/${id}`).then(res => res.json())
      )
      
      const collegesData = await Promise.all(promises)
      setColleges(collegesData.filter(Boolean) as College[])
      setLoading(false)
    }

    fetchColleges()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Compare Colleges
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Side-by-side comparison of your selected colleges. Fees, ratings, placements and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              Browse Colleges
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('compareColleges')
                setColleges([])
              }}
              className="btn btn-ghost"
            >
              Clear All
            </button>
          </div>
        </div>

        {colleges.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Comparison Table ({colleges.length} colleges)
            </h2>
            <CompareTable colleges={colleges} />
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl shadow-xl">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v4m0 4h.01M21 14H3" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Colleges Selected</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Click the + button on up to 3 college cards from the listing page to compare them here.
            </p>
            <Link href="/" className="btn btn-primary">
              Start Comparing
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

