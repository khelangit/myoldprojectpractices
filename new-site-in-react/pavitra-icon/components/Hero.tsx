'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Download, Calendar } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 glass rounded-full text-[#D4AF37] text-sm tracking-widest border border-[#D4AF37]/30">
            WELCOME TO LUXURY
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-playfair font-bold mb-6"
        >
          <span className="text-gradient">Pavitra</span>
          <br />
          <span className="text-white">Icon</span>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-[#f5e6d3] mb-4 font-light italic"
        >
          "Perfection of nature & luxurious life"
        </motion.p>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg text-white/70 mb-12 max-w-2xl mx-auto"
        >
          2 & 3 BHK Luxurious Flats & Shops
          <br />
          Near Bhakti Circle, New Nikol, Ahmedabad
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#f5e6d3] text-black font-semibold rounded-full overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Calendar size={20} />
              <span>Book Site Visit</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-full flex items-center space-x-2 hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            <Download size={20} />
            <span>Download Brochure</span>
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "2/3", label: "BHK Options" },
            { number: "14", label: "Floors" },
            { number: "Premium", label: "Amenities" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center glass p-6 rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-[#D4AF37]"
        >
          <span className="text-sm mb-2 tracking-widest">SCROLL</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  )
}