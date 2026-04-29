import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { collegeId, action } = await req.json() // action: 'save' or 'unsave'

    if (action === 'save') {
      await prisma.savedCollege.upsert({
        where: {
          userId_collegeId: { userId: user.id, collegeId }
        },
        update: {},
        create: {
          userId: user.id,
          collegeId
        }
      })
    } else {
      await prisma.savedCollege.deleteMany({
        where: {
          userId: user.id,
          collegeId
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie()
    if (!user) {
      return NextResponse.json({ saved: [] })
    }

    const saved = await prisma.savedCollege.findMany({
      where: { userId: user.id },
      include: { college: true }
    })

    return NextResponse.json({ saved: saved.map((s: any) => s.college) })
  } catch (error) {
    return NextResponse.json({ saved: [] })
  }
}
