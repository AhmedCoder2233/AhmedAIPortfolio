'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { nav } from '@/lib/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  return (
    <>
      <motion.div aria-hidden="true" style={{ scaleX: w }} className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-accent" />
      <header className="fixed inset-x-0 top-3 z-[80] px-3 sm:top-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-line bg-white py-2 pl-3 pr-2">
          <a href="#top" aria-label="Ahmed Memon, top" className="flex items-center gap-2.5">
            <Image src="/images/logo.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full" priority />
            <span className="font-display text-base font-extrabold">Ahmed Memon</span>
          </a>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex gap-1">
              {nav.map((n) => (
                <li key={n.id}><a href={n.href} className="rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:bg-ink/5 hover:text-ink">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-dark !min-h-[44px] !px-5 !text-sm">Let&apos;s talk</a>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ink/5 lg:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} aria-label="Mobile" className="mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-white p-3 shadow-xl lg:hidden">
            <ul>{nav.map((n) => <li key={n.id}><a href={n.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg font-bold hover:bg-ink/5">{n.label}</a></li>)}</ul>
          </motion.nav>
        )}
      </header>
    </>
  )
}
