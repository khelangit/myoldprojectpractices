'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Navigation, Clock, TrendingUp } from 'lucide-react'

const landmarks = [
  { name: "S.P. Ring Road", distance: "0.5 km", icon: "🛣️" },
  { name: "D-Mart", distance: "1.2 km", icon: "🏪" },
  { name: "Parikh Hospital", distance: "1.5 km", icon: "🏥" },
  { name: "Selbi Hospital", distance: "0.8 km", icon: "⚕️" },
  { name: "Galaxy Bungalows", distance: "0.3 km", icon: "🏘️" },
  { name: "Bhakti Circle", distance: "0.2 km", icon: "⭕" },
  { name: "M.G. Road", distance: "2 km", icon: "🛤️" },
  { name: "Kathwada", distance: "1 km", icon: "🌆" }
]

const connectivity = [
  { icon: Clock, title: "15 mins", subtitle: "To City Center" },
  { icon: Navigation, title: "5 mins", subtitle: "To Ring Road" },
  { icon: TrendingUp, title: "Prime", subtitle: "Growth Area" },
  { icon: MapPin, title: "New Nikol", subtitle: "Prime Location" }
]

export default function Location() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="location"
      ref={ref}
      className="relative py-24 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D4AF37] tracking-[0.3em] text-sm mb-4">
            PRIME LOCATION
          </span>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            <span className="text-white">Strategically</span>
            <br />
            <span className="text-gradient">Located</span>
          </h2>
          
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Beside Pushti Skyline, Nr. Galaxy Bungalows, Bhakti Circle to Kathwada Road, New Nikol, Ahmedabad
          </p>
        </motion.div>

        {/* Connectivity Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {connectivity.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="neo rounded-xl p-6 text-center group hover:glow transition-all"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37] to-[#f5e6d3] rounded-lg flex items-center justify-center"
              >
                <item.icon className="text-black" size={24} />
              </motion.div>
              <h4 className="text-2xl font-bold text-gradient mb-1">{item.title}</h4>
              <p className="text-white/60 text-sm">{item.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map/Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="aspect-square rounded-2xl overflow-hidden neo">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074"
                alt="Location Map"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 backdrop-blur-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <MapPin className="text-black" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Pavitra Icon</h4>
                      <p className="text-white/60 text-sm">New Nikol, Ahmedabad</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    className="block w-full text-center bg-[#D4AF37] text-black py-2 rounded-lg font-semibold hover:bg-[#f5e6d3] transition-colors"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Landmarks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-3xl font-playfair font-bold text-white mb-8">
              Nearby <span className="text-gradient">Landmarks</span>
            </h3>
            
            <div className="space-y-4">
              {landmarks.map((landmark, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between glass rounded-xl p-4 group hover:border-[#D4AF37]/50 border border-transparent transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{landmark.icon}</span>
                    <span className="text-white font-medium">{landmark.name}</span>
                  </div>
                  <span className="text-[#D4AF37] font-semibold">{landmark.distance}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-xl border-l-4 border-[#D4AF37]"
            >
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <TrendingUp className="mr-2 text-[#D4AF37]" size={20} />
                Excellent Connectivity
              </h4>
              <p className="text-white/70 text-sm">
                Strategically located with easy access to major roads, schools, hospitals, and shopping centers
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}