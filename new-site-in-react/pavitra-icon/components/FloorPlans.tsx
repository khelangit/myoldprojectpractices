'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from './ui/SectionHeading'
import Modal from './ui/Modal'
import { Search } from 'lucide-react'

type Plan = {
  key: string
  label: string
  img: string
  note?: string
}

export default function FloorPlans() {
  const tabs: Plan[] = useMemo(
    () => [
      {
        key: 'ground',
        label: 'Ground Floor (Shops)',
        img: '/floorplans/ground-floor.jpg',
        note: 'Shop layout plan (Ground Floor).',
      },
      {
        key: 'typical',
        label: 'Typical Floor',
        img: '/floorplans/typical-floor-a.jpg',
        note: 'Typical floors (2nd to 14th).',
      },
      {
        key: '2bhk',
        label: '2BHK Layout',
        img: '/floorplans/2bhk.jpg',
        note: '2BHK configuration.',
      },
      {
        key: '3bhk',
        label: '3BHK Layout',
        img: '/floorplans/3bhk.jpg',
        note: '3BHK configuration.',
      },
    ],
    []
  )

  const [active, setActive] = useState(tabs[0]!.key)
  const [open, setOpen] = useState(false)

  const plan = tabs.find((t) => t.key === active) ?? tabs[0]!

  return (
    <section id="floor-plans" className="relative py-24 bg-black">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="LAYOUTS"
          title="Floor"
          highlight="Plans"
          subtitle="Explore shop layouts, typical floor planning, and 2BHK/3BHK configurations. Tap to zoom for a detailed view."
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {tabs.map((t) => {
            const isActive = t.key === active
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={[
                  'px-5 py-3 rounded-full text-sm font-semibold transition-all border',
                  isActive
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'glass text-white/80 border-white/10 hover:border-[#D4AF37]/40 hover:text-white',
                ].join(' ')}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="neo rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="p-5 md:p-7 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white">
                {plan.label}
              </h3>
              {plan.note ? (
                <p className="text-white/60 mt-2">{plan.note}</p>
              ) : null}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/40 transition text-white/80"
            >
              <Search size={18} />
              Zoom
            </button>
          </div>

          <div className="relative w-full aspect-[16/9] bg-black">
            <Image
              src={plan.img}
              alt={plan.label}
              fill
              className="object-contain p-3 md:p-6"
              sizes="(max-width: 768px) 100vw, 900px"
              priority={false}
            />
          </div>
        </motion.div>

        {/* Modal zoom */}
        <Modal open={open} onClose={() => setOpen(false)} title={plan.label}>
          <div className="relative w-full h-[70vh] bg-black rounded-xl overflow-hidden border border-white/10">
            <Image
              src={plan.img}
              alt={plan.label}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="text-white/60 mt-4 text-sm">
            Tip: On mobile, pinch-to-zoom in the image viewer.
          </p>
        </Modal>
      </div>
    </section>
  )
}