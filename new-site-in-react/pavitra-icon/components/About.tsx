'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Trees, Shield, Star } from 'lucide-react'

const features = [
  {
    icon: Home,
    title: "Premium Living",
    description: "Spacious 2 & 3 BHK flats with modern architecture"
  },
  {
    icon: Trees,
    title: "Natural Surroundings",
    description: "Enveloped by nature for pure air and peace"
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "24/7 security with CCTV surveillance"
  },
  {
    icon: Star,
    title: "Prime Location",
    description: "Close to Nikol Ring Road & all amenities"
  }
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block text-[#D4AF37] tracking-[0.3em] text-sm mb-4"
          >
            ABOUT PROJECT
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-gradient">Luxury Meets</span>
            <br />
            <span className="text-white">Nature</span>
          </h2>
          
          <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
            Being enveloped by nature, it's pure air, spacious planning and surroundings 
            will relax your mind and body. More importantly, it'll give you quality time 
            with family and some much needed 'me' time. All this conveniently close enough 
            to the Nikol Ring Road!
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative neo rounded-2xl p-8 hover:glow transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#f5e6d3] rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50"
              >
                <feature.icon className="text-black" size={32} />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden group"
        >
          <div className="aspect-[21/9] relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
              alt="Pavitra Icon Building"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
            >
              <h3 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">
                "Perfection of nature & luxurious Life"
              </h3>
              <p className="text-white/80 text-lg max-w-2xl">
                Experience the perfect blend of modern luxury and natural tranquility at Pavitra Icon
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Developer Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 }}
          className="mt-16 text-center glass rounded-2xl p-8"
        >
          <p className="text-white/60 mb-2">Developed By</p>
          <h4 className="text-2xl font-bold text-gradient">Shree Ganesh Realty</h4>
          <p className="text-white/50 text-sm mt-2">Architecture by Z-Axis Architects</p>
        </motion.div>
      </div>
    </section>
  )
}