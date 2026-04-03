'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Location from '@/components/Location'
import Amenities from '@/components/Amenities'
import FloorPlans from '@/components/FloorPlans'
import ThreeDFlats from '@/components/ThreeDFlats'
import Gallery from '@/components/Gallery'
import Specifications from '@/components/Specifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import ScrollProgress from '@/components/ScrollProgress'
import Loader from '@/components/Loader'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500)
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <About />
        <Location />
        <Amenities />
        <FloorPlans />
        <ThreeDFlats />
        <Gallery />
        <Specifications />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}