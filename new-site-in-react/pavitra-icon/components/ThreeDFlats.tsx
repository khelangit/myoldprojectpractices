'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from './ui/SectionHeading'

const flats = [
  {
    title: '2BHK 3D View',
    subtitle: 'Elegant & efficient planning',
    img: '/floorplans/2bhk.jpg',
  },
  {
    title: '3BHK 3D View',
    subtitle: 'Spacious premium lifestyle',
    img: '/floorplans/3bhk.jpg',
  },
]

export default function ThreeDFlats() {
  return (
    <section id="3d-flats" className="relative py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="IMMERSIVE"
          title="3D Flat"
          highlight="Views"
          subtitle="Hover to feel depth. Designed with a luxury 3D tilt interaction."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {flats.map((f, idx) => (
            <motion.div
              key={idx}
              className="group relative neo rounded-3xl overflow-hidden border border-white/10"
              whileHover={{ rotateX: 6, rotateY: -6, y: -8 }}
              transition={{ type: 'spring', stiffness: 160, damping: 16 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

              <div className="p-7">
                <h3 className="text-3xl font-playfair font-bold text-white">
                  {f.title}
                </h3>
                <p className="text-white/60 mt-2">{f.subtitle}</p>
              </div>

              <div className="relative w-full aspect-[16/10] bg-black">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>

              {/* gold edge */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.18)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}