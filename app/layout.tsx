import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Mono, IBM_Plex_Sans } from 'next/font/google'

import './globals.css'

const _spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

const _ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex',
})

export const metadata: Metadata = {
  title: 'VOID STATION // Deep Space Observatory',
  description: 'A retro minimal space exploration interface. Monitor deep space signals, track celestial objects, and explore the cosmos.',
}

export const viewport: Viewport = {
  themeColor: '#0a0d14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_spaceMono.variable} ${_ibmPlex.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <div className="crt-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
