'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { services } from '@/lib/content'
import SectionHead from './SectionHead'

const tone = ['bg-ink text-white', 'bg-accent text-white', 'bg-white text-ink']
const sub = ['text-white/70', 'text-white/85', 'text-muted']

function Card({ s, i, n, p }: { s: (typeof services)[number]; i: number; n: number; p: MotionValue<number> }) {
  const scale = useTransform(p, [i / n, 1], [1, 1 - (n - 1 - i) * 0.05])
  const Icon = s.icon
  return (
    <motion.li style={{ scale, top: 84 + i * 14 }} className={`origin-top sticky rounded-[24px] p-7 sm:p-10 md:p-12 ${tone[i]}`}>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12">
        <div>
          <Icon size={44} strokeWidth={1.6} aria-hidden="true" />
          <h3 className="mt-6 text-[clamp(2.2rem,4.4vw,3.75rem)] font-extrabold leading-[0.98]">{s.title}</h3>
          <p className={`mt-5 max-w-md text-lg ${sub[i]}`}>{s.text}</p>
        </div>
        <ul className="space-y-3">
          {s.points.map((pt) => (
            <li key={pt} className="flex items-center gap-3 border-b border-current/15 pb-3 text-lg font-semibold">
              <Check size={20} strokeWidth={3} aria-hidden="true" /> {pt}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section id="services" aria-labelledby="services-title" className="section !pt-10">
      <div className="container-x">
        <SectionHead id="services-title" title="Three things I do really well." />
        <div ref={ref} className="mt-14">
          <ul className="space-y-8 md:space-y-10">
            {services.map((s, i) => <Card key={s.title} s={s} i={i} n={services.length} p={scrollYProgress} />)}
          </ul>
        </div>
      </div>
    </section>
  )
}
