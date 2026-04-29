import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const cookieStore = cookies()
    cookieStore.delete('auth-token')

    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

