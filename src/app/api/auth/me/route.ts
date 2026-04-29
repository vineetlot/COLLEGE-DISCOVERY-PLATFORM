import { NextRequest, NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
