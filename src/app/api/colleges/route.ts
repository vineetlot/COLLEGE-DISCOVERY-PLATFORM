import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const location = searchParams.get('location') || ''
  const minFeesStr = searchParams.get('minFees') || '0'
  const maxFeesStr = searchParams.get('maxFees') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const minFees = parseFloat(minFeesStr) || 0
  let maxFees = Infinity
  if (maxFeesStr && maxFeesStr.trim() !== '') {
    const parsedMax = parseFloat(maxFeesStr)
    if (!isNaN(parsedMax)) {
      maxFees = parsedMax
    }
  }

  const skip = (page - 1) * limit

  try {
    const colleges = await prisma.college.findMany({
      where: {
        name: {
          contains: search,
        },
        location: {
          contains: location,
        },
        fees: {
          gte: minFees,
          ...(maxFees !== Infinity && { lte: maxFees }),
        },
      },
      skip,
      take: limit,
      orderBy: {
        rating: 'desc',
      },
    })

    const total = await prisma.college.count({
      where: {
        name: {
          contains: search,
        },
        location: {
          contains: location,
        },
        fees: {
          gte: minFees,
          ...(maxFees !== Infinity && { lte: maxFees }),
        },
      },
    })

    return NextResponse.json({
      colleges,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    )
  }
}

