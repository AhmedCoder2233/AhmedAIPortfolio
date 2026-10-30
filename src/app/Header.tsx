'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '#about', label: 'About' },
  { href: '#voice-ai', label: 'Voice AI' },
  { href: '#systems', label: 'Automations' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto max-w-5xl">
        <nav className="flex items-center justify-between rounded-full border border-[var(--line)] bg-white/80 py-2 pl-2.5 pr-2.5 shadow-[0_8px_30px_rgba(14,23,38,0.06)] backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2.5 rounded-full pr-3" aria-label="Ahmed Memon home">
            <Logo size={36} />
            <span className="font-display text-[15px] font-semibold tracking-tight">Ahmed Memon</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--ink)]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="mailto:ahmedmemon3344@gmail.com"
              className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent)]"
            >
              Get in touch
            </a>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] md:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="pop mt-2 rounded-3xl border border-[var(--line)] bg-white/95 p-2 shadow-[0_8px_30px_rgba(14,23,38,0.08)] backdrop-blur-xl md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--bg)]"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
