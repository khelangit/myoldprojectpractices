'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from './ui/SectionHeading'
import Modal from './ui/Modal'

export default function Gallery() {
  const images = useMemo(
    () => [
      '/gallery/1.jpg',
      '/gallery/2.jpg',
      '/gallery/3.jpg',
      '/gallery/4.jpg',
      '/gallery/5.jpg',
      '/gallery/6.jpg',
      '/gallery/7.jpg',
      '/gallery/8.jpg',
    ],
    []
  )

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(images[0]!)

  return (
    <section id="gallery" className="relative py-24 bg-black">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="VISUALS"
          title="Project"
          highlight="Gallery"
          subtitle="A premium masonry gallery with smooth zoom lightbox preview."
        />

        {/* Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {images.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => {
                setActive(src)
                setOpen(true)
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.04 }}
              className="mb-5 w-full overflow-hidden rounded-2xl border border-white/10 glass hover:border-[#D4AF37]/30 transition text-left"
            >
              <div className="relative w-full">
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
            </motion.button>
          ))}
        </div>

        <Modal open={open} onClose={() => setOpen(false)} title="Gallery Preview">
          <div className="relative w-full h-[70vh] bg-black rounded-xl overflow-hidden border border-white/10">
            <Image src={active} alt="Gallery preview" fill className="object-contain" sizes="100vw" />
          </div>
        </Modal>
      </div>
    </section>
  )
}