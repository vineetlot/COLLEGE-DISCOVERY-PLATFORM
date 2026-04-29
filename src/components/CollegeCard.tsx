'use client'

'use client'

import Link from 'next/link'
// Remove Prisma import - use any type instead

interface College {
  id: string
  name: string
  location: string
  fees: number
  rating: number
}

interface CollegeCardProps {
  college: College
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const toggleCompare = () => {
    const selected = JSON.parse(localStorage.getItem('compareColleges') || '[]') as string[]
    const idx = selected.indexOf(college.id)
    
    if (idx > -1) {
      selected.splice(idx, 1)
    } else if (selected.length < 3) {
      selected.push(college.id)
    } else {
      alert('Maximum 3 colleges for comparison')
      return
    }
    
    localStorage.setItem('compareColleges', JSON.stringify(selected))
  }

  const isSelected = JSON.parse(localStorage.getItem('compareColleges') || '[]').includes(college.id)

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition-all relative group">
      <div className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ${
        isSelected ? 'bg-orange-500 text-white' : 'bg-white shadow-md border-2 border-gray-200'
      } p-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110`}>
        <button onClick={toggleCompare} className="w-full h-full p-0 m-0">
          {isSelected ? '✓' : '+'}
        </button>
      </div>
      
      <Link href={`/colleges/${college.id}`} className="block">
        <h3 className="text-xl font-bold mb-2">{college.name}</h3>
        <p className="text-gray-600 mb-2">{college.location}</p>
        <p className="text-2xl font-bold text-green-600 mb-4">₹{college.fees.toLocaleString()}</p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-semibold">⭐ {college.rating}</span>
        </div>
      </Link>
      
      {isSelected && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-t-lg shadow-lg">
          Selected for compare
        </div>
      )}
    </div>
  )
}

