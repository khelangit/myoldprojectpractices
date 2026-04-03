import './globals.css'
import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Pavitra Icon - Luxury 2/3 BHK Flats & Shops in New Nikol, Ahmedabad',
  description: 'Perfection of nature & luxurious life. Premium 2 & 3 BHK flats and shops near Bhakti Circle, New Nikol, Ahmedabad.',
  keywords: 'Pavitra Icon, Luxury Flats Ahmedabad, 2BHK 3BHK, New Nikol, Shree Ganesh Realty',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${playfair.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}