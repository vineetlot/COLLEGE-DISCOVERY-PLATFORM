import { NextRequest, NextResponse } from 'next/server'

const CUTOFFS = [
  { college: 'IIT Bombay CSE', cutoffRank: 100 },
  { college: 'IIT Delhi CSE', cutoffRank: 200 },
  { college: 'IIT Madras CSE', cutoffRank: 300 },
  { college: 'NIT Trichy CSE', cutoffRank: 5000 },
  { college: 'BITS Pilani CSE', cutoffRank: 1500 },
  { college: 'IIIT Hyderabad CSE', cutoffRank: 800 },
  { college: 'IIT Kanpur CSE', cutoffRank: 350 },
  { college: 'IIT Kharagpur CSE', cutoffRank: 450 },
  { college: 'NIT Surathkal CSE', cutoffRank: 6500 },
  { college: 'VIT Vellore CSE', cutoffRank: 12000 },
  // Add more for realism
]

export async function POST(req: NextRequest) {
  try {
    const { exam, rank } = await req.json()
    const rankNum = parseInt(rank)

    if (isNaN(rankNum) || rankNum < 1) {
      return NextResponse.json({ error: 'Invalid rank' }, { status: 400 })
    }

    const predictions = CUTOFFS
      .map(c => ({
        college: c.college,
        cutoffRank: c.cutoffRank,
        matchPercent: Math.max(0, 100 - Math.abs((rankNum - c.cutoffRank) / c.cutoffRank * 100))
      }))
      .filter(p => p.matchPercent > 30)
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, 12)

    return NextResponse.json({ predictions })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

