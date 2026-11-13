import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/geist'
import '@fontsource-variable/inter'
import './globals.css'
import { SITE } from '@/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: '%s | Ahmed Memon' },
  description: SITE.description,
  applicationName: 'Ahmed Memon',
  authors: [{ name: 'Ahmed Memon', url: SITE.url }],
  creator: 'Ahmed Memon',
  keywords: [
    'AI voice agents', 'AI calling agent', 'AI automation', 'AI agents developer', 'Retell AI', 'Vapi',
    'lead generation automation', 'order confirmation calls', 'Next.js developer', 'AI automation freelancer', 'Ahmed Memon',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', url: '/', siteName: 'Ahmed Memon', title: SITE.title, description: SITE.description, locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#F5F2EB',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript><style>{`.intro{display:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  )
}
