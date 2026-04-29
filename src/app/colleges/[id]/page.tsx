'use client'

import { useState, useEffect } from 'react'

interface Course {
  name: string
  duration: string
}

interface Review {
  user: string
  text: string
  rating: number
}

interface Placements {
  avgSalary: number
  companies: string[]
}

interface College {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  courses: string
  placements: string
  reviews: string
  isSaved?: boolean
}

export default function CollegeDetail({ params }: { params: { id: string } }) {
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('courses')
  const [isSaved, setIsSaved] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    const fetchCollege = async () => {
      const res = await fetch(`/api/colleges/${params.id}`)
      const data = await res.json()
      setCollege(data)
      setLoading(false)
    }

    fetchCollege()
  }, [params.id])

  const toggleSave = async () => {
    if (!college) return

    setSaveLoading(true)
    const res = await fetch('/api/users/saves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collegeId: college.id, action: isSaved ? 'unsave' : 'save' })
    })
    
    if (res.ok) {
      setIsSaved(!isSaved)
    }
    setSaveLoading(false)
  }

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
  if (!college) return <p>College not found</p>

  const parsedCourses: Course[] = college.courses ? JSON.parse(college.courses) : []
  const parsedPlacements: Placements = college.placements ? JSON.parse(college.placements) : { avgSalary: 0, companies: [] }
  const parsedReviews: Review[] = college.reviews ? JSON.parse(college.reviews) : []

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{college.name}</h1>
          <div className="flex gap-6 text-lg">
            <span>📍 {college.location}</span>
            <span>💰 ₹{college.fees.toLocaleString()}/year</span>
            <span>⭐ {college.rating}/5</span>
          </div>
        </div>
        <button
          onClick={toggleSave}
          disabled={saveLoading}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            isSaved
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          } ${saveLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {saveLoading ? '...' : isSaved ? 'Unsave' : 'Save'}
        </button>
      </div>

      <div className="tabs tabs-boxed mb-8">
        <a className={`tab ${activeTab === 'courses' ? 'tab-active' : ''}`} onClick={() => setActiveTab('courses')}>Courses</a>
        <a className={`tab ${activeTab === 'placements' ? 'tab-active' : ''}`} onClick={() => setActiveTab('placements')}>Placements</a>
        <a className={`tab ${activeTab === 'reviews' ? 'tab-active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</a>
      </div>

      <div>
        {activeTab === 'courses' && (
          <div className="space-y-2">
            <h3 className="text-2xl font-bold mb-4">Courses Offered</h3>
            {parsedCourses.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parsedCourses.map((course, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
                    <h4 className="font-semibold">{course.name}</h4>
                    <p className="text-gray-600">{course.duration}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No courses data available</p>
            )}
          </div>
        )}

        {activeTab === 'placements' && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Placements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Average Salary</h4>
                <p className="text-3xl font-bold text-green-600">₹{parsedPlacements.avgSalary} LPA</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Top Recruiters</h4>
                <div className="flex flex-wrap gap-2">
                  {parsedPlacements.companies.map((company, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Student Reviews</h3>
            {parsedReviews.length ? (
              parsedReviews.map((review, i) => (
                <div key={i} className="p-6 border rounded-lg bg-white shadow-sm">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-900">{review.user}</span>
                    <span className="ml-auto">⭐ {review.rating}</span>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


