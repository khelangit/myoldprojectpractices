'use client'

import { motion } from 'framer-motion'
import { Phone, Download } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export default function FloatingCTA() {
  const whatsappNumber = '919925028146'
  const whatsappText = encodeURIComponent('Hi, I am interested in Pavitra Icon. Please share details.')
  const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col gap-3">
      <motion.a
        href={waLink}
        target="_blank"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#25D366] text-black font-semibold shadow-lg"
      >
        <FaWhatsapp size={22} />
        WhatsApp
      </motion.a>

      <motion.a
        href="tel:+919925028146"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#f5e6d3] text-black font-semibold shadow-lg"
      >
        <Phone size={20} />
        Call
      </motion.a>

      <motion.a
        href="/brochure/pavitra-icon.pdf"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-3 px-5 py-4 rounded-2xl glass border border-white/10 text-white font-semibold shadow-lg hover:border-[#D4AF37]/40"
      >
        <Download size={20} className="text-[#D4AF37]" />
        Brochure
      </motion.a>
    </div>
  )
}