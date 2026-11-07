import { Star } from 'lucide-react'
import { reviews } from '@/lib/content'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="container-x">
        <SectionHead id="reviews-title" title="Kind words from clients." />
        <ul className="mt-16 flex flex-wrap justify-center gap-5">
          {reviews.map((r, i) => (
            <li key={r.name} className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <Reveal delay={(i % 3) * 90} className="h-full">
                <figure className="flex h-full flex-col rounded-[22px] bg-white p-7 transition duration-300 hover:-translate-y-1.5">
                  <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={18} fill="currentColor" aria-hidden="true" />)}
                  </div>
                  <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed">{r.quote}</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white">{r.name.split(' ').map((n) => n[0]).join('')}</span>
                    <span className="font-bold">{r.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
