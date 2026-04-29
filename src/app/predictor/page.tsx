'use client'

import { useState } from 'react'

interface Prediction {
  college: string
  cutoffRank: number
  matchPercent: number
}

const CUTOFFS = [
  { college: 'IIT Bombay CSE', cutoffRank: 100, matchPercent: 95 },
  { college: 'IIT Delhi CSE', cutoffRank: 200, matchPercent: 90 },
  { college: 'IIT Madras CSE', cutoffRank: 300, matchPercent: 85 },
  { college: 'NIT Trichy CSE', cutoffRank: 5000, matchPercent: 80 },
  { college: 'BITS Pilani CSE', cutoffRank: 1500, matchPercent: 88 },
  { college: 'IIIT Hyderabad CSE', cutoffRank: 800, matchPercent: 92 },
  // Add more
]

export default function Predictor() {
  const [exam, setExam] = useState('JEE Main')
  const [rank, setRank] = useState('')
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(false)

  const handlePredict = async () => {
    setLoading(true)
    
    const res = await fetch('/api/predictor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exam, rank })
    })
    
    if (res.ok) {
      const data = await res.json()
      setPredictions(data.predictions)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            College Predictor
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Enter your exam rank to get personalized college recommendations based on previous cutoffs
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
              <select 
                value={exam} 
                onChange={(e) => setExam(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option>JEE Main</option>
                <option>JEE Advanced</option>
                <option>NEET</option>
                <option>MHT CET</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">All India Rank</label>
              <input
                type="number"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                placeholder="Enter your rank (e.g. 1250)"
                className="w-full p-4 text-2xl border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                min="1"
              />
            </div>
          </div>
          
          <button
            onClick={handlePredict}
            disabled={loading || !rank}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-8 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Predicting your colleges...
              </div>
            ) : (
              '🔮 Predict My Colleges'
            )}
          </button>
        </div>

        {predictions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Your College Predictions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions.map((pred, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center font-bold text-white">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{pred.college}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(pred.matchPercent / 20) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{pred.matchPercent.toFixed(0)}% Match</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Expected Cutoff Rank: <span className="font-bold text-gray-900">{pred.cutoffRank.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all"
                      style={{ width: `${pred.matchPercent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

