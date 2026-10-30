'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Target, Database, Sparkles, Send, MessageSquareReply, CalendarCheck,
  Lightbulb, CalendarRange, PenLine, Image as ImageIcon, BadgeCheck, Share2,
  ShoppingCart, PhoneCall, ClipboardCheck, ThumbsUp, LayoutDashboard, Check,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Reveal from './Reveal'

type Node = { icon: LucideIcon; label: string; sub: string }
type System = {
  id: string
  tab: string
  title: string
  desc: string
  outcome: string
  stack: string[]
  nodes: Node[]
}

const systems: System[] = [
  {
    id: 'outreach',
    tab: 'Lead generation & outreach',
    title: 'AI lead generation and outreach',
    desc: 'Finds businesses that match your ideal customer, researches each one and writes a personal first message. Replies are sorted by intent, and interested prospects are booked straight into your calendar.',
    outcome: 'A steady flow of booked conversations without manual prospecting.',
    stack: ['n8n', 'OpenAI', 'Google Calendar', 'CRM'],
    nodes: [
      { icon: Target, label: 'Target profile', sub: 'Industry, role, region' },
      { icon: Database, label: 'Leads collected', sub: 'Found and enriched' },
      { icon: Sparkles, label: 'Message written', sub: 'Personalised by AI' },
      { icon: Send, label: 'Outreach sent', sub: 'Email and calls' },
      { icon: MessageSquareReply, label: 'Replies sorted', sub: 'Interested or not' },
      { icon: CalendarCheck, label: 'Call booked', sub: 'CRM updated' },
    ],
  },
  {
    id: 'content',
    tab: '30-day content',
    title: 'AI 30-day content system',
    desc: 'Turns a short brand brief into a full month of content. The system plans the calendar, writes every caption and script, creates the visuals and schedules each post once you approve it.',
    outcome: 'A month of consistent posting from a single brief.',
    stack: ['n8n', 'OpenAI', 'Google Sheets', 'Buffer'],
    nodes: [
      { icon: Lightbulb, label: 'Brand brief', sub: 'Niche, tone, goals' },
      { icon: CalendarRange, label: '30-day calendar', sub: 'Topics and formats' },
      { icon: PenLine, label: 'Copy written', sub: 'Captions and scripts' },
      { icon: ImageIcon, label: 'Visuals created', sub: 'On-brand designs' },
      { icon: BadgeCheck, label: 'Your approval', sub: 'Review in one place' },
      { icon: Share2, label: 'Auto-scheduled', sub: 'Posted on time' },
    ],
  },
  {
    id: 'cod',
    tab: 'COD order confirmation',
    title: 'AI cash-on-delivery order confirmation',
    desc: 'When a customer places a cash-on-delivery order on your online store, an AI calling agent phones them, checks the details and asks them to confirm. The result is saved to your dashboard, whether the customer confirms or rejects.',
    outcome: 'Fewer fake and returned orders, and a clear status for every order.',
    stack: ['Retell AI', 'Twilio', 'n8n', 'Next.js', 'Supabase'],
    nodes: [
      { icon: ShoppingCart, label: 'Order placed', sub: 'On your website' },
      { icon: PhoneCall, label: 'AI calls customer', sub: 'Automatic call' },
      { icon: ClipboardCheck, label: 'Details checked', sub: 'Items and address' },
      { icon: ThumbsUp, label: 'Customer decides', sub: 'Confirm or reject' },
      { icon: LayoutDashboard, label: 'Saved to dashboard', sub: 'Next.js and Supabase' },
    ],
  },
]

const STEP_MS = 1100
const HOLD_MS = 2400

function Flow({ system, step }: { system: System; step: number }) {
  const { nodes } = system
  const n = nodes.length
  const fill = n > 1 ? Math.max(0, Math.min(step, n - 1)) / (n - 1) : 0

  const Dot = ({ node, i }: { node: Node; i: number }) => {
    const done = step > i
    const active = step === i
    const Icon = node.icon
    return (
      <span
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
          done || active
            ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
            : 'border-[var(--line)] bg-white text-[var(--muted)]'
        } ${active ? 'scale-110 shadow-[0_0_0_6px_var(--accent-soft)]' : ''}`}
      >
        {done ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
      </span>
    )
  }

  return (
    <>
      {/* Desktop: horizontal */}
      <div className="relative hidden md:block">
        <div
          className="absolute top-6 h-[3px] rounded-full bg-[var(--line)]"
          style={{ left: `${50 / n}%`, right: `${50 / n}%` }}
        >
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-700 ease-in-out"
            style={{ width: `${fill * 100}%` }}
          />
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {nodes.map((node, i) => (
            <div key={node.label} className="flex flex-col items-center px-2 text-center">
              <Dot node={node} i={i} />
              <p className={`mt-4 text-sm font-semibold transition-colors duration-500 ${step >= i ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                {node.label}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[var(--muted)]">{node.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="relative md:hidden">
        <div className="absolute bottom-6 left-6 top-6 w-[3px] -translate-x-1/2 rounded-full bg-[var(--line)]">
          <div
            className="w-full rounded-full bg-[var(--accent)] transition-all duration-700 ease-in-out"
            style={{ height: `${fill * 100}%` }}
          />
        </div>
        <div className="flex flex-col gap-5">
          {nodes.map((node, i) => (
            <div key={node.label} className="flex items-center gap-4">
              <Dot node={node} i={i} />
              <div>
                <p className={`text-sm font-semibold transition-colors duration-500 ${step >= i ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>{node.label}</p>
                <p className="text-[13px] text-[var(--muted)]">{node.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default function AISystems() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(-1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const system = systems[active]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const total = systems[active].nodes.length
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(total)
      return
    }
    if (!inView) return
    let s = -1
    let t: ReturnType<typeof setTimeout>
    setStep(-1)
    const tick = () => {
      s += 1
      if (s > total) {
        s = -1
        setStep(-1)
        t = setTimeout(tick, 700)
        return
      }
      setStep(s)
      t = setTimeout(tick, s === total ? HOLD_MS : STEP_MS)
    }
    t = setTimeout(tick, 500)
    return () => clearTimeout(t)
  }, [active, inView])

  return (
    <section id="systems" className="px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
            Selected work
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            Three automation systems and how each one runs from the first trigger to the final result.
          </p>
        </Reveal>

        <div ref={sectionRef} className="mt-12">
          <div role="tablist" className="inline-flex max-w-full flex-wrap gap-1 rounded-3xl border border-[var(--line)] bg-white p-1.5 sm:rounded-full">
            {systems.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  active === i ? 'bg-[var(--ink)] text-white' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div key={system.id} className="pop mt-5 overflow-hidden rounded-[28px] border border-[var(--line)] bg-white">
            <div className="grid gap-8 border-b border-[var(--line)] p-7 sm:p-9 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{system.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-[var(--muted)]">{system.desc}</p>
              </div>
              <div className="rounded-2xl bg-[var(--bg)] p-5">
                <p className="text-sm font-semibold">Result</p>
                <p className="mt-1.5 leading-relaxed text-[var(--muted)]">{system.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {system.stack.map((t) => (
                    <span key={t} className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-9">
              <p className="mb-8 text-sm font-semibold text-[var(--muted)]">How the system works</p>
              <Flow system={system} step={step} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
