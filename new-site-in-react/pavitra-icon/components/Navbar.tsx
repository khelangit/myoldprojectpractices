'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Location', href: '#location' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Floor Plans', href: '#floor-plans' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
  { name: '3D Views', href: '#3d-flats' },
  { name: 'Specifications', href: '#specifications' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="text-3xl font-playfair font-bold text-gradient">
              Pavitra <span className="text-[#D4AF37]">Icon</span>
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-white/80 hover:text-[#D4AF37] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            
            <motion.a
              href="tel:+919925028146"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#f5e6d3] text-black px-6 py-3 rounded-full font-semibold hover:glow transition-all"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 glass rounded-lg overflow-hidden"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-4 text-white/80 hover:text-[#D4AF37] hover:bg-white/5 transition-all border-b border-white/10"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.a
                href="tel:+919925028146"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="block m-4 text-center bg-gradient-to-r from-[#D4AF37] to-[#f5e6d3] text-black px-6 py-3 rounded-full font-semibold"
              >
                Call: +91 99250 28146
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}