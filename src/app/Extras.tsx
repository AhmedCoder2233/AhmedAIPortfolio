import { ArrowUpRight, Quote } from 'lucide-react'
import Reveal from './Reveal'
import { reviews, websites, stack } from './content'

export function Stack() {
  return (
    <section id="stack" className="px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Tech stack</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {stack.map((t) => (
              <span key={t} className="rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-medium">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Reviews() {
  if (!reviews.length) return null
  return (
    <section id="reviews" className="px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">What clients say</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {reviews.map((r, i) => (
            <Reveal key={r.name + i} delay={i * 80} className="flex w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
              <figure className="flex w-full flex-col rounded-3xl border border-[var(--line)] bg-white p-7">
                <Quote size={22} className="text-[var(--accent)]" />
                <blockquote className="mt-4 flex-1 leading-relaxed">{r.quote}</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  {r.role && <span className="text-[var(--muted)]"> · {r.role}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Websites() {
  if (!websites.length) return null
  return (
    <section id="websites" className="px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">Websites I built</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {websites.map((w, i) => (
            <Reveal key={w.url} delay={i * 80}>
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-4 rounded-3xl border border-[var(--line)] bg-white p-7 transition-colors hover:border-[var(--ink)]">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{w.name}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--muted)]">{w.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-medium">{t}</span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight size={20} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
