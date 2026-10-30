'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, PhoneCall, Check } from 'lucide-react'

const script = [
  { who: 'ai', text: "Hello, I'm calling from Northwind Store about order #1042, cash on delivery. Can I confirm it for you?" },
  { who: 'customer', text: 'Yes, please go ahead.' },
  { who: 'ai', text: 'Thank you. It will be delivered to 14 Park Road tomorrow. Your order is confirmed.' },
] as const

function LiveCall() {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(script.length + 1)
      return
    }
    let n = 0
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      n += 1
      setShown(n)
      if (n <= script.length) t = setTimeout(tick, n === 1 ? 1500 : 1900)
      else
        t = setTimeout(() => {
          n = 0
          setShown(0)
          t = setTimeout(tick, 900)
        }, 4200)
    }
    t = setTimeout(tick, 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="rounded-[28px] border border-[var(--line)] bg-white p-3 shadow-[0_30px_80px_-30px_rgba(14,23,38,0.25)]">
      <div className="flex items-center justify-between rounded-2xl bg-[var(--bg)] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-white">
            <span className="ping-soft absolute inset-0 rounded-full bg-[var(--accent)]" />
            <PhoneCall size={16} className="relative" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">AI calling agent</p>
            <p className="text-xs text-[var(--muted)]">Order confirmation call</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[var(--ok-soft)] px-2.5 py-1 text-xs font-medium text-[var(--ok)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Live
        </span>
      </div>

      <div className="flex min-h-[230px] sm:min-h-[262px] flex-col gap-3 px-3 py-5">
        {script.slice(0, Math.min(shown, script.length)).map((m, i) => (
          <div key={i} className={`pop flex ${m.who === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <p
              className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.who === 'ai'
                  ? 'rounded-bl-md bg-[var(--accent-soft)] text-[var(--ink)]'
                  : 'rounded-br-md bg-[var(--ink)] text-white'
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <div className="min-h-[64px] px-1 pb-1">
        {shown > script.length && (
          <div className="pop flex items-center justify-between rounded-2xl border border-[var(--line)] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ok-soft)] text-[var(--ok)]">
                <Check size={16} strokeWidth={3} />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Order #1042</p>
                <p className="text-xs text-[var(--muted)]">Saved to dashboard</p>
              </div>
            </div>
            <span className="rounded-full bg-[var(--ok-soft)] px-3 py-1 text-xs font-semibold text-[var(--ok)]">Confirmed</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-16 lg:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(#cfd5df 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="rise inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3.5 py-1.5 text-sm text-[var(--muted)]" style={{ animationDelay: '0.05s' }}>
            <span className="h-2 w-2 rounded-full bg-[var(--ok)]" />
            Available for new projects
          </p>

          <h1
            className="font-display rise mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]"
            style={{ animationDelay: '0.15s' }}
          >
            AI voice agents and automation that run your operations.
          </h1>

          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]" style={{ animationDelay: '0.3s' }}>
            I&apos;m Ahmed Memon. I design and build AI calling agents and end-to-end automation systems that handle leads, orders and content for growing businesses.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '0.45s' }}>
            <a
              href="#systems"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent)]"
            >
              See selected work
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="mailto:ahmedmemon3344@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-medium transition-colors hover:border-[var(--ink)]"
            >
              Get in touch
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

        </div>

        <div className="rise" style={{ animationDelay: '0.4s' }}>
          <LiveCall />
        </div>
      </div>
    </section>
  )
}
