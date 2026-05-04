import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Centro Estetico Karisma | Trattamenti di Lusso',
  description: 'Scopri i nostri trattamenti estetici premium. Esperienza 15+ anni, professionisti certificati, prodotti naturali. Prenota ora il tuo appuntamento.',
  keywords: ['centro estetico', 'trattamenti viso', 'massaggi', 'spa', 'benessere', 'bellezza'],
  authors: [{ name: 'Centro Estetico Karisma' }],
  openGraph: {
    title: 'Centro Estetico Karisma | Trattamenti di Lusso',
    description: 'Scopri i nostri trattamenti estetici premium. Esperienza 15+ anni, professionisti certificati.',
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centro Estetico Karisma',
    description: 'Trattamenti estetici premium per il tuo benessere.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className="bg-background">
      <body className={`font-sans antialiased ${inter.variable} ${playfair.variable}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
