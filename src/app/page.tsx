'use client'

import { useState, useEffect, useCallback } from 'react'
import CollegeCard from '@/components/CollegeCard'
import FilterBar from '@/components/FilterBar'

interface College {
  id: string
  name: string
  location: string
  fees: number
  rating: number
}

interface ApiResponse {
  colleges: College[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [minFees, setMinFees] = useState('0')
  const [maxFees, setMaxFees] = useState('')
  const [page, setPage] = useState(1)

  const fetchColleges = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      search,
      location,
      minFees,
      maxFees,
      page: page.toString(),
      limit: '9'
    })

    const res = await fetch(`/api/colleges?${params}`)
    const data: ApiResponse = await res.json()
    setColleges(data.colleges)
    setLoading(false)
  }, [search, location, minFees, maxFees, page])

  useEffect(() => {
    fetchColleges()
  }, [fetchColleges])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Discover Colleges</h1>
      <p className="text-xl mb-8">Search, compare, and discover your perfect college.</p>
      <FilterBar
        onSearchChange={setSearch}
        onLocationChange={setLocation}
        onMinFeesChange={setMinFees}
        onMaxFeesChange={setMaxFees}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  )
}
