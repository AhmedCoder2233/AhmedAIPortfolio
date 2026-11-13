import { ArrowUpRight } from 'lucide-react'
import { SITE } from '@/lib/content'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-2 pb-4 pt-10 sm:px-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-20 text-white sm:px-14 sm:py-28">
          <div className="relative mx-auto max-w-5xl">
            <h2 id="contact-title" className="text-[clamp(2.6rem,8vw,7rem)] font-extrabold leading-[0.92]">Got a process that should run itself?</h2>
            <p className="mt-8 max-w-lg text-lg text-white/70">Tell me what eats your team&apos;s time. I&apos;ll reply within a day with how I would automate it.</p>
            <a href={`mailto:${SITE.email}?subject=Project%20inquiry`} className="group mt-12 inline-flex flex-wrap items-center gap-4 break-all font-display text-[clamp(1.3rem,3.4vw,2.5rem)] font-bold">
              <span className="border-b-2 border-accent pb-1 transition group-hover:border-white">{SITE.email}</span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent transition group-hover:rotate-45"><ArrowUpRight size={26} aria-hidden="true" /></span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
