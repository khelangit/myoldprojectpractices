'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import {
  Car,
  ArrowUpDown,
  Camera,
  Sun,
  Droplets,
  Flame,
  Users,
  Shield,
  Baby,
  Accessibility,
  Zap,
  DoorOpen,
} from 'lucide-react'

const amenities = [
  {
    icon: Car,
    name: 'Basement Parking',
    desc: 'Secure covered parking for all residents',
  },
  {
    icon: ArrowUpDown,
    name: '2 Lifts + 1 Stretcher Lift',
    desc: 'High-speed lifts with 24hr power backup',
  },
  {
    icon: Camera,
    name: 'CCTV Camera',
    desc: '24/7 surveillance for complete security',
  },
  {
    icon: Sun,
    name: 'Solar Panel',
    desc: 'Eco-friendly energy for common areas',
  },
  {
    icon: Droplets,
    name: '24Hr Water Supply',
    desc: 'Round-the-clock borewell water supply',
  },
  {
    icon: Flame,
    name: 'Fire Safety System',
    desc: 'Complete fire detection & suppression',
  },
  {
    icon: Baby,
    name: 'Children Play Area',
    desc: 'Safe & fun play zone for kids',
  },
  {
    icon: Accessibility,
    name: 'Senior Citizen Sitting',
    desc: 'Peaceful garden seating area',
  },
  {
    icon: Shield,
    name: 'Security Cabin',
    desc: 'Manned entry gate round the clock',
  },
  {
    icon: Zap,
    name: '24Hr Power Backup',
    desc: 'Uninterrupted power for lifts & common areas',
  },
  {
    icon: DoorOpen,
    name: 'Designer Gate',
    desc: 'Grand entrance with premium lobby',
  },
  {
    icon: Users,
    name: 'Community Spaces',
    desc: 'Thoughtfully designed common areas',
  },
]

export default function Amenities() {
  const ref = useRef(null)

  return (
    <section
      id="amenities"
      ref={ref}
      className="py-24 bg-gradient-to-b from-[#050505] to-black border-y border-white/5"
    >
      <div className="container mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[#D4AF37] tracking-[0.3em] text-sm uppercase"
          >
            Facilities
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-playfair font-bold mt-4 mb-4 text-white"
          >
            World Class{' '}
            <span className="text-gradient">Amenities</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto text-lg"
          >
            Every detail designed to elevate your everyday living experience.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {amenities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group glass border border-white/10 rounded-2xl p-6
                         hover:border-[#D4AF37]/40 transition-all duration-300
                         cursor-pointer hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            >
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center
                              justify-center mb-4 group-hover:bg-[#D4AF37]/10 transition">
                <a.icon
                  className="w-7 h-7 text-white/50 group-hover:text-[#D4AF37] transition"
                />
              </div>

              <h3 className="text-white font-semibold mb-1 text-sm md:text-base">
                {a.name}
              </h3>
              <p className="text-white/40 text-xs md:text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}