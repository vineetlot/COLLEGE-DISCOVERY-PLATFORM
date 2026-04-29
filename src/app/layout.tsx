import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'College Discovery Platform',
  description: 'Find and compare colleges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg p-4 text-white sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
              🎓 CollegeHub
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/" className="hover:underline font-medium">Discover</Link>
              <Link href="/compare" className="hover:underline font-medium">Compare</Link>
              <Link href="/predictor" className="hover:underline font-medium">Predictor</Link>
              <Link href="/login" className="hover:underline font-medium">Login</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-8">
          {children}
        </main>
      </body>
    </html>
  )
}
