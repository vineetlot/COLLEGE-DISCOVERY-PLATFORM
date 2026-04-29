'use client'

interface CollegeCompare {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  placements: string
}

interface CompareTableProps {
  colleges: CollegeCompare[]
}

export default function CompareTable({ colleges }: CompareTableProps) {
  if (colleges.length === 0) {
    return <p className="text-gray-500 text-center py-12">No colleges selected for comparison</p>
  }

  const parseSalary = (placementsStr: string) => {
    try {
      const placements = JSON.parse(placementsStr)
      return placements.avgSalary || 0
    } catch {
      return 0
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full bg-white rounded-lg shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <th></th>
            {colleges.map((college, idx) => (
              <th key={college.id} className="text-left font-bold py-4">
                {idx + 1}. {college.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Location</th>
            {colleges.map(college => (
              <td key={college.id} className="font-medium">{college.location}</td>
            ))}
          </tr>
          <tr>
            <th>Annual Fees</th>
            {colleges.map(college => (
              <td key={college.id}>₹{college.fees.toLocaleString()}</td>
            ))}
          </tr>
          <tr>
            <th>Rating</th>
            {colleges.map(college => (
              <td key={college.id}><span className="text-yellow-500">⭐ {college.rating}</span></td>
            ))}
          </tr>
          <tr className="bg-gradient-to-r from-green-50 to-emerald-50">
            <th>Avg Salary (LPA)</th>
            {colleges.map(college => {
              const salary = parseSalary(college.placements)
              return (
                <td key={college.id} className="font-bold text-green-700">
                  ₹{salary.toFixed(1)}
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
      <div className="mt-6 flex gap-3">
        <button 
          onClick={() => {
            localStorage.removeItem('compareColleges')
            window.location.reload()
          }}
          className="btn btn-warning"
        >
          Clear Comparison
        </button>
        <button 
          className="btn btn-ghost"
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
    </div>
  )
}

