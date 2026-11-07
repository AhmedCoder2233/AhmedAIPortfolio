'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useMotionTemplate, animate } from 'framer-motion'

export default function Intro() {
  const [phase, setPhase] = useState<'dot' | 'open' | 'done'>('dot')
  const r = useMotionValue(0)
  const mask = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${r}vmax, #000 calc(${r}vmax + 1px))`

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('done'); return }
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [])

  useEffect(() => {
    if (phase === 'open') {
      const c = animate(r, 150, { duration: 1.1, ease: [0.76, 0, 0.24, 1], onComplete: () => setPhase('done') })
      return () => c.stop()
    }
    if (phase === 'done') document.documentElement.style.overflow = ''
  }, [phase, r])

  if (phase === 'done') return null
  return (
    <motion.div
      aria-hidden="true"
      className="intro fixed inset-0 z-[200] flex items-center justify-center"
      style={phase === 'open' ? { background: '#0B0B10', WebkitMaskImage: mask, maskImage: mask } : { background: '#F5F2EB' }}
    >
      {phase === 'dot' && (
        <motion.span
          className="block h-3 w-3 rounded-full bg-ink"
          initial={{ scale: 1 }}
          animate={{ scale: 420 }}
          transition={{ duration: 1.7, ease: [0.8, 0, 0.9, 0.4] }}
          onAnimationComplete={() => setPhase('open')}
        />
      )}
    </motion.div>
  )
}
