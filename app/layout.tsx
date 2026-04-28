import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from '@/components/Providers'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Artur Cempura — Engineering Lead, AI Enablement',
  description:
    'AI-assisted delivery, internal tooling, and team scaling — for organizations that want results, not roadmaps.',
  metadataBase: new URL('https://cempura.it'),
  openGraph: {
    title: 'Artur Cempura — Engineering Lead, AI Enablement',
    description:
      'AI-assisted delivery, internal tooling, and team scaling — for organizations that want results, not roadmaps.',
    url: 'https://cempura.it',
    siteName: 'cempura.it',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artur Cempura — Engineering Lead, AI Enablement',
    description:
      'AI-assisted delivery, internal tooling, and team scaling — for organizations that want results, not roadmaps.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
