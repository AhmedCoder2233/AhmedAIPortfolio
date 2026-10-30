'use client'

import { useEffect, useRef, useState } from 'react'
import { Download, Pause, Play, PhoneIncoming, Stethoscope, UtensilsCrossed } from 'lucide-react'
import Reveal from './Reveal'

type Agent = {
  tag: string
  title: string
  description: string
  src: string
  file: string
  icon: typeof PhoneIncoming
}

const agents: Agent[] = [
  {
    tag: 'Voice agent',
    title: 'AI Dental Agent',
    description:
      'Voice agent for a dental clinic. It answers patient calls and helps book appointments.',
    src: '/audio/dentaldemo.mp3',
    file: 'Ahmed-Memon-AI-Dental-Receptionist.mp3',
    icon: PhoneIncoming,
  },
  {
    tag: 'Voice agent',
    title: 'AI Hospital Agent',
    description:
      'Voice agent for a hospital. It answers patient calls and helps with appointment requests.',
    src: '/audio/hospitaldemo.mp3',
    file: 'Ahmed-Memon-AI-Hospital-Receptionist.mp3',
    icon: Stethoscope,
  },
  {
    tag: 'Voice agent',
    title: 'AI Restaurant Agent',
    description:
      'Voice agent for a restaurant. It answers customer calls and helps with bookings and questions.',
    src: '/audio/restaurantdemo (1).mp3',
    file: 'Ahmed-Memon-AI-Restaurant-Assistant.mp3',
    icon: UtensilsCrossed,
  },
]

const bars = [3, 5, 8, 6, 9, 7, 5, 8, 10, 7, 6, 9, 8, 5, 7, 6, 8, 7, 5, 9, 8, 6, 7, 5, 8, 9, 6, 7, 5, 8, 7, 6, 9, 5, 7, 8, 6, 5, 7, 4]

let currentlyPlaying: HTMLAudioElement | null = null

const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`

function Player({ agent }: { agent: Agent }) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [missing, setMissing] = useState(false)

  const progress = duration ? (time / duration) * 100 : 0
  const Icon = agent.icon

  // Events can fire before hydration, so read the audio state once on mount
  useEffect(() => {
    const a = ref.current
    if (!a) return
    if (a.error || a.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setMissing(true)
    else if (a.readyState >= 1 && isFinite(a.duration)) setDuration(a.duration)
    // Fallback: confirm the file exists
    fetch(agent.src, { method: 'HEAD' }).then((r) => { if (!r.ok) setMissing(true) }).catch(() => {})
  }, [agent.src])

  const toggle = () => {
    const a = ref.current
    if (!a || missing) return
    if (a.paused) {
      if (currentlyPlaying && currentlyPlaying !== a) currentlyPlaying.pause()
      currentlyPlaying = a
      a.play().catch(() => setMissing(true))
    } else a.pause()
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current
    if (!a || !duration) return
    const r = e.currentTarget.getBoundingClientRect()
    a.currentTime = ((e.clientX - r.left) / r.width) * duration
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-white p-6">
      <audio
        ref={ref}
        src={agent.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setMissing(true)}
      />

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon size={20} />
        </span>
        <span className="text-sm font-medium text-[var(--muted)]">{agent.tag}</span>
      </div>

      <h3 className="font-display mt-5 text-xl font-semibold tracking-tight">{agent.title}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-[var(--muted)]">{agent.description}</p>

      <div
        className="mt-6 flex h-12 cursor-pointer items-center gap-[3px]"
        onClick={seek}
        role="presentation"
      >
        {bars.map((h, i) => {
          const active = (i / bars.length) * 100 < progress
          return (
            <span
              key={i}
              className="flex-1 origin-center rounded-full transition-colors duration-150"
              style={{
                height: `${h * 4.2}px`,
                background: active ? 'var(--accent)' : '#dfe3ea',
                animation: playing && active ? `wave 1s ease-in-out ${(i % 7) * 0.09}s infinite` : undefined,
              }}
            />
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={toggle}
          disabled={missing}
          aria-label={playing ? 'Pause recording' : 'Play recording'}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-white transition-colors hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[var(--ink)]"
        >
          {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </button>

        <span className="flex-1 text-sm tabular-nums text-[var(--muted)]">
          {missing ? 'Recording coming soon' : duration ? `${fmt(time)} / ${fmt(duration)}` : 'Loading'}
        </span>

        {missing ? (
          <span className="flex h-11 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-medium text-[var(--muted)] opacity-50">
            <Download size={16} /> Download
          </span>
        ) : (
          <a
            href={agent.src}
            download={agent.file}
            className="flex h-11 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-medium transition-colors hover:border-[var(--ink)]"
          >
            <Download size={16} /> Download
          </a>
        )}
      </div>
    </div>
  )
}

export default function VoiceAI() {
  return (
    <section id="voice-ai" className="px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
            Hear the agents on a real call.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            Three voice agents for different businesses. Play each recording or download it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <Reveal key={a.title} delay={i * 90}>
              <Player agent={a} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
