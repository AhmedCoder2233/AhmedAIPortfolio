import { Mic, Workflow, Globe, Sparkles, Layers } from 'lucide-react'
import Reveal from './Reveal'

const stats = [
  { value: '1+', label: 'Years of experience' },
  { value: '40+', label: 'Projects delivered' },
  { value: '3', label: 'Core services' },
]

const services = [
  { icon: Mic, title: 'AI Voice Agents', text: 'Inbound and outbound calling agents that talk to customers and book, confirm or qualify.' },
  { icon: Workflow, title: 'AI Automations with n8n', text: 'Lead generation, outreach, content and order workflows that run without manual steps.' },
  { icon: Globe, title: 'Websites', text: 'Fast, modern websites and dashboards built with Next.js and React.' },
]

export default function About() {
  return (
    <section id="about" className="px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
            One person, the whole system.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            I take a business process from idea to a working AI system: the conversation design, the automation behind it and the dashboard your team uses every day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="h-full rounded-3xl border border-[var(--line)] bg-white p-7">
                <p className="font-display text-6xl font-semibold tracking-[-0.04em] text-[var(--accent)]">{s.value}</p>
                <p className="mt-3 text-base font-medium">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full items-start gap-4 rounded-3xl bg-[var(--ink)] p-7 text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10"><Sparkles size={20} /></span>
              <div>
                <p className="whitespace-nowrap text-lg font-semibold">AI-first approach</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">Every solution starts with what AI can take off your plate, then adds people where they matter.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full items-start gap-4 rounded-3xl bg-[var(--ink)] p-7 text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10"><Layers size={20} /></span>
              <div>
                <p className="whitespace-nowrap text-lg font-semibold">End&#8209;to&#8209;end development</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">Planning, building, testing and handover from a single point of contact.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="border-t border-[var(--ink)] pt-5">
                <Icon size={22} className="text-[var(--accent)]" />
                <h3 className="font-display mt-4 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--muted)]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
