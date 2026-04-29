import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export async function getUserFromCookie() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null

  const user = await prisma.user.findUnique({
    where: { id: token }
  })
  return user
}


