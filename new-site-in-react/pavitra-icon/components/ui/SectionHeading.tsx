'use client'

import { motion } from 'framer-motion'

export default function SectionHeading({
  kicker,
  title,
  highlight,
  subtitle,
  center = true,
}: {
  kicker: string
  title: string
  highlight?: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={center ? 'text-center mb-16' : 'mb-12'}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        className="inline-block text-[#D4AF37] tracking-[0.3em] text-sm mb-4"
      >
        {kicker}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-playfair font-bold mb-6"
      >
        <span className="text-white">{title}</span>{' '}
        {highlight ? <span className="text-gradient">{highlight}</span> : null}
      </motion.h2>

      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}