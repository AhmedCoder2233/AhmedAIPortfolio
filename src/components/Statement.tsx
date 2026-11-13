'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const text = 'Most businesses lose hours every week to calls, follow-ups and busywork. I build AI agents and automations that handle it, so your team can focus on what actually grows the business.'
const words = text.split(' ')

function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.14, 1])
  return <motion.span style={{ opacity: o }} className="mr-[0.28em] inline-block">{w}</motion.span>
}

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  return (
    <section aria-label="What I do" className="section">
      <div ref={ref} className="container-x">
        <p className="max-w-5xl font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.02em]">
          {words.map((w, i) => <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={Math.min(1, (i + 3) / words.length)} />)}
        </p>
      </div>
    </section>
  )
}
