'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Mail, Phone, PhoneOff } from 'lucide-react'
import { SITE, stats } from '@/lib/content'
import { HeroShell, upAt } from './shared'

export default function HeroCall({ base }: { base: number }) {
  const up = upAt(base)
  const [on, setOn] = useState(false)
  const [sec, setSec] = useState(0)
  useEffect(() => {
    if (!on) return
    const t = setInterval(() => setSec((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [on])
  const go = (h: string) => (e: React.MouseEvent) => { e.preventDefault(); document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <HeroShell id="hero-title">
      <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.p {...up(0)} className="chip inline-flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Taking on new projects</motion.p>
          <motion.h1 id="hero-title" {...up(0.1)} className="mt-7 text-[clamp(2.2rem,4.8vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.025em]">
            Let AI Answer Calls &amp; Automate the Rest
          </motion.h1>
          <motion.p {...up(0.25)} className="mt-5 max-w-lg text-lg text-muted">I build AI calling agents, AI automations &amp; agents and fast websites that answer, follow up and book for your business around the clock.</motion.p>
          <motion.div {...up(0.4)} className="mt-9 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn btn-dark"><Mail size={16} aria-hidden="true" /> Email me</a>
            <a href="#workflows" className="btn btn-line">See my work</a>
          </motion.div>
          <motion.dl {...up(0.5)} className="mt-10 flex max-w-lg gap-10 border-t border-line pt-6 sm:gap-14">
            {stats.slice(0, 2).map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-extrabold leading-none tracking-[-0.02em] sm:text-5xl">{s.value}</dd>
                <p aria-hidden="true" className="mt-2 text-sm font-semibold text-muted">{s.label}</p>
              </div>
            ))}
          </motion.dl>
        </div>
        <motion.div {...up(0.35)} className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] overflow-hidden rounded-[32px] bg-ink p-7 text-white">
            <div className="relative flex min-h-[420px] flex-col items-center text-center">
              <AnimatePresence mode="wait">
                {!on ? (
                  <motion.div key="r" exit={{ opacity: 0, scale: 0.95 }} className="flex flex-1 flex-col items-center">
                    <p className="text-sm text-white/60">Incoming call…</p>
                    <div className="relative mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-white font-display text-4xl font-bold text-ink">
                      AM
                      {[0, 0.6, 1.2].map((d) => <span key={d} style={{ animationDelay: `${d}s` }} className="absolute inset-0 animate-ping rounded-full border-2 border-accent" />)}
                    </div>
                    <p className="mt-6 font-display text-3xl font-bold">Ahmed Memon</p>
                    <p className="mt-1 text-white/60">AI automation engineer</p>
                    <div className="mt-auto flex w-full justify-between pt-10">
                      <a href="#services" onClick={go('#services')} aria-label="Decline, see services" className="flex flex-col items-center gap-2 text-xs text-white/70"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"><PhoneOff size={24} /></span>Not now</a>
                      <button type="button" onClick={() => setOn(true)} aria-label="Answer the call" className="flex cursor-pointer flex-col items-center gap-2 text-xs text-white/70"><span className="flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-emerald-500 text-white"><Phone size={24} /></span>Answer</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="c" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex w-full flex-1 flex-col text-left">
                    <p className="text-sm text-emerald-400">Connected · 0:{String(sec).padStart(2, '0')}</p>
                    <p className="mt-5 font-display text-2xl font-bold leading-snug">&ldquo;Hi, I&apos;m Ahmed. What should we automate first?&rdquo;</p>
                    <div className="mt-6 space-y-2.5">
                      {[['Voice agents', '#voice-agents'], ['Automation workflows', '#workflows'], ['Websites', '#websites']].map(([l, h]) => (
                        <a key={h} href={h} onClick={go(h)} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3.5 text-[15px] font-semibold transition hover:bg-white hover:text-ink">{l}<ArrowUpRight size={16} /></a>
                      ))}
                    </div>
                    <a href={`mailto:${SITE.email}`} className="btn mt-auto w-full bg-accent text-white hover:brightness-110"><Mail size={16} aria-hidden="true" /> Email me</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </HeroShell>
  )
}
