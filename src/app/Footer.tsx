import { ArrowUpRight, Mail } from 'lucide-react'
import Logo from './Logo'
import Reveal from './Reveal'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <>
      <section id="contact" className="px-6 pb-24 pt-12 lg:px-16">
        <Reveal className="mx-auto max-w-6xl">
          <div className="rounded-[32px] bg-[var(--ink)] px-7 py-14 text-white sm:px-14 sm:py-20">
            <h2 className="font-display max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl">
              Have a process you want to automate?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Tell me what takes up your team&apos;s time. I&apos;ll reply with how an AI system could handle it.
            </p>
            <a
              href="mailto:ahmedmemon3344@gmail.com"
              className="group mt-9 inline-flex max-w-full items-center gap-2.5 rounded-full bg-white px-5 py-3.5 text-[13px] font-semibold sm:px-7 sm:py-4 sm:text-sm text-[var(--ink)] transition-colors hover:bg-[var(--accent-soft)]"
            >
              <Mail size={17} />
              ahmedmemon3344@gmail.com
              <ArrowUpRight size={16} className="hidden transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-[var(--line)] px-6 py-8 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="text-sm text-[var(--muted)]">© {year} Ahmed Memon. All rights reserved.</span>
          </div>
          <nav className="flex gap-6 text-sm text-[var(--muted)]">
            <a href="#about" className="hover:text-[var(--ink)]">About</a>
            <a href="#voice-ai" className="hover:text-[var(--ink)]">Voice AI</a>
            <a href="#systems" className="hover:text-[var(--ink)]">Automations</a>
          </nav>
        </div>
      </footer>
    </>
  )
}
