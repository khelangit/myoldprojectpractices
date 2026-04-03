'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

const specs = [
  {
    title: 'Structure',
    body: 'RCC framed structure designed for durability and long-term strength.',
  },
  {
    title: 'Flooring',
    body: 'Premium vitrified tiles in living, dining, and bedrooms for an elegant finish.',
  },
  {
    title: 'Kitchen',
    body: 'Granite platform with stainless steel sink and provision for water purifier.',
  },
  {
    title: 'Electrical',
    body: 'Concealed copper wiring with modular switches and adequate power points.',
  },
  {
    title: 'Doors & Windows',
    body: 'Designer main door with quality fittings and aluminum/uPVC windows (project standard).',
  },
  {
    title: 'Safety & Security',
    body: 'CCTV surveillance, fire safety provisions, and security cabin.',
  },
]

export default function Specifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="specifications" className="relative py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="DETAILS"
          title="Project"
          highlight="Specifications"
          subtitle="Premium materials and thoughtfully curated finishes."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {specs.map((s, i) => {
            const isOpen = openIndex === i
            return (
              <div key={s.title} className="neo rounded-2xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-white font-semibold text-lg">{s.title}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-[#D4AF37]">
                    <ChevronDown />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 text-white/70"
                    >
                      {s.body}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <p className="text-center text-white/40 text-xs mt-10 max-w-3xl mx-auto">
          Note: Specifications are indicative and may change as per approvals/requirements.
        </p>
      </div>
    </section>
  )
}