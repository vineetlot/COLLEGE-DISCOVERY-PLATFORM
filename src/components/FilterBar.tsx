'use client'

interface FilterBarProps {
  onSearchChange: (value: string) => void
  onLocationChange: (value: string) => void
  onMinFeesChange: (value: string) => void
  onMaxFeesChange: (value: string) => void
}

export default function FilterBar({ onSearchChange, onLocationChange, onMinFeesChange, onMaxFeesChange }: FilterBarProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search colleges..."
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onLocationChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Fees"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onMinFeesChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Fees"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onMaxFeesChange(e.target.value)}
        />
      </div>
    </div>
  )
}
