'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setDone(false)

    // Replace with your API (Next route, CRM, Google Sheet, etc.)
    await new Promise((r) => setTimeout(r, 900))

    setLoading(false)
    setDone(true)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="relative py-24 bg-black">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="ENQUIRY"
          title="Get a"
          highlight="Callback"
          subtitle="Share your details and our team will connect with you shortly."
        />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="neo rounded-3xl border border-white/10 p-7"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Details</h3>

            <div className="space-y-4 text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#D4AF37] mt-1" />
                <div>
                  <div className="text-white font-medium">Site Address</div>
                  <div>
                    Near Bhakti Circle, New Nikol, Ahmedabad
                    <br />
                    (Bhakti Circle to Kathwada Road)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#D4AF37]" />
                <a className="hover:text-white" href="tel:+919925028146">
                  +91 99250 28146
                </a>
                <span className="text-white/40">/</span>
                <a className="hover:text-white" href="tel:+919173804086">
                  +91 91738 04086
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#D4AF37]" />
                <a className="hover:text-white" href="mailto:info@pavitraicon.com">
                  info@pavitraicon.com
                </a>
              </div>

              <div className="glass rounded-2xl p-5 border border-[#D4AF37]/20">
                <div className="text-[#D4AF37] font-semibold">RERA</div>
                <div className="text-white/80 text-sm mt-1">
                  PR/GJ/AHMEDABAD/AHMEDABAD CITY/AUDA/MAA12749/040124/310827
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass rounded-3xl border border-white/10 p-7"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                name="name"
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60"
              />
              <input
                required
                name="phone"
                placeholder="Phone"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60"
              />
            </div>

            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="mt-4 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60"
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="mt-4 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60"
            />

            <button
              disabled={loading}
              className="mt-5 w-full px-6 py-4 rounded-xl font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#f5e6d3] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] transition disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Get Callback'}
            </button>

            {done ? (
              <p className="text-[#D4AF37] text-sm mt-4">
                Thanks! We’ll call you back shortly.
              </p>
            ) : null}
          </motion.form>
        </div>
      </div>
    </section>
  )
}