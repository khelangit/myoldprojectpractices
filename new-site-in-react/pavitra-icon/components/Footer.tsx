'use client'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-3xl font-playfair font-bold text-gradient">
              Pavitra Icon
            </div>
            <p className="text-white/60 mt-3 max-w-sm">
              Perfection of nature & luxurious life. Premium 2 & 3 BHK flats + shops in New Nikol, Ahmedabad.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Address</h4>
            <p className="text-white/60">
              Near Bhakti Circle, New Nikol, Ahmedabad
              <br />
              Bhakti Circle to Kathwada Road
            </p>
            <p className="text-white/60 mt-3">
              RERA: <span className="text-white/80">PR/GJ/AHMEDABAD/AHMEDABAD CITY/AUDA/MAA12749/040124/310827</span>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-white/60">
              <a href="tel:+919925028146" className="hover:text-white">+91 99250 28146</a>
              <br />
              <a href="tel:+919173804086" className="hover:text-white">+91 91738 04086</a>
            </p>
            <p className="text-white/60 mt-3">
              Developer: <span className="text-white/80">Shree Ganesh Realty</span>
              <br />
              Architect: <span className="text-white/80">Z-Axis Architects</span>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-white/40 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Pavitra Icon. All rights reserved.</div>
          <div>Luxury Real Estate Website • Next.js • Tailwind • Framer Motion</div>
        </div>
      </div>
    </footer>
  )
}