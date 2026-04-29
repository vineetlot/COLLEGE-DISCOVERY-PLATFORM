import { cookies } from 'next/headers'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export type UserWithId = {
  id: string
  email: string
  name?: string | null
}

export async function getUserFromCookie(): Promise<UserWithId | null> {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) return null

  try {
    const userId = token  // Simple token as userId (improve to JWT later)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true }
    })

    return user ?? null
  } catch {
    return null
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}
