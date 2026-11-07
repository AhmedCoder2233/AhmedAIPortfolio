import { ArrowUpRight } from 'lucide-react'
import { websites } from '@/lib/content'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Websites() {
  return (
    <section id="websites" aria-labelledby="websites-title" className="section">
      <div className="container-x">
        <SectionHead id="websites-title" title="Websites that are live right now." text="Open them and see for yourself." />
        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {websites.map((w, i) => (
            <li key={w.url}>
              <Reveal delay={i * 120} className="h-full">
                <a href={w.url} target="_blank" rel="noopener noreferrer" aria-label={`${w.name}, opens ${w.host} in a new tab`} className="group relative flex h-full flex-col overflow-hidden rounded-[36px] bg-white p-8 pr-24 transition-colors duration-500 hover:text-white sm:p-10">
                  <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
                  <span className="relative text-sm font-semibold text-muted transition-colors duration-500 group-hover:text-white/60">{w.host}</span>
                  <div className="relative mt-5">
                    <h3 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-[1]">{w.name}</h3>
                    <p className="mt-4 max-w-md text-muted transition-colors duration-500 group-hover:text-white/70">{w.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
                      {w.tags.map((t) => <li key={t} className="chip transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">{t}</li>)}
                    </ul>
                  </div>
                  <span className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white transition duration-500 group-hover:rotate-45 sm:right-10 sm:top-10">
                    <ArrowUpRight size={24} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
