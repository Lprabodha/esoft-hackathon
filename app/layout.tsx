import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TalentSync',
  description: 'TalentSync : Smart Platform for Academic and Professional Growth',
  generator: 'TalentSync',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
