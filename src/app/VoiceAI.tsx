'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  title: string
  description: string
  useCase: string
  tag: string
  color: string
  index: number
}

function AudioPlayer({ title, description, useCase, tag, color, index }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const barCount = 40

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const p = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(isNaN(p) ? 0 : p)
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => setIsPlaying(false)

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * audioRef.current.duration
  }

  const colorMap: Record<string, { bg: string; text: string; ring: string; bar: string; glow: string }> = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      ring: 'ring-blue-200',
      bar: 'bg-blue-500',
      glow: 'shadow-blue-200',
    },
    violet: {
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      ring: 'ring-violet-200',
      bar: 'bg-violet-500',
      glow: 'shadow-violet-200',
    },
  }
  const c = colorMap[color] || colorMap.blue

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 hover:border-neutral-200 hover:shadow-lg transition-all duration-300 group">
      {/* Hidden audio element — add src when recordings are ready */}
      <audio
        ref={audioRef}
        src={`/audio/${index === 0 ? 'inbound' : 'outbound'}.mp3`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.text} ${c.bg} px-3 py-1 rounded-full mb-3`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {tag}
          </span>
          <h3 className="text-base font-semibold text-neutral-900 leading-snug">{title}</h3>
        </div>
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-lg`}>
          {index === 0 ? '📥' : '📤'}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-500 leading-relaxed mb-4">{description}</p>

      {/* Use case chip */}
      <div className="flex items-start gap-2 mb-5 p-3 bg-neutral-50 rounded-xl">
        <svg className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <p className="text-xs text-neutral-600 leading-relaxed font-medium">{useCase}</p>
      </div>

      {/* Waveform visualizer (decorative) */}
      <div className="flex items-center gap-[2px] h-10 mb-4 cursor-pointer" onClick={handleProgressClick}>
        {Array.from({ length: barCount }).map((_, i) => {
          const heights = [3,5,8,6,9,7,5,8,10,7,6,9,8,5,7,6,8,7,5,9,8,6,7,5,8,9,6,7,5,8,7,6,9,5,7,8,6,5,7,4]
          const h = heights[i % heights.length]
          const isActive = (i / barCount) * 100 < progress
          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-colors duration-100 ${isActive ? c.bar : 'bg-neutral-200'}`}
              style={{ height: `${h * 4}px` }}
            />
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={`w-9 h-9 rounded-full ${c.bar} flex items-center justify-center text-white hover:opacity-90 transition-all hover:scale-105 shadow-md ${isPlaying ? c.glow : ''}`}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden cursor-pointer" onClick={handleProgressClick}>
          <div
            className={`h-full ${c.bar} rounded-full transition-all duration-100`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs text-neutral-400 font-mono tabular-nums">
          {duration > 0 ? `${formatTime(currentTime)} / ${formatTime(duration)}` : '— Add recording —'}
        </span>
      </div>
    </div>
  )
}

export default function VoiceAI() {
  return (
    <section id="voice-ai" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-7a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Voice AI Demos
          </div>
          <h2 className="text-4xl font-light text-neutral-900 tracking-tight mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Hear the AI in action
          </h2>
          <p className="text-neutral-500 leading-relaxed">
            Real recordings of production-grade Voice AI agents handling inbound and outbound calls — fully autonomous, natural conversation flow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AudioPlayer
  index={0}
  tag="Inbound Call Agent"
  color="blue"
  title="AI Dental Receptionist — Patient Qualification & Booking"
  description="An AI Voice Agent answering inbound calls for a dental clinic, qualifying patients based on their needs — then instantly booking appointments."
  useCase="Used by dental practices to handle 100% of inbound patient calls 24/7, reducing no-shows and freeing up front-desk staff."
/>
<AudioPlayer
  index={1}
  tag="Outbound Sales Agent"
  color="violet"
  title="AI Real Estate Agent — Outbound Lead Qualification"
  description="An AI agent making outbound calls to real estate leads, qualifying buyer/seller intent, handling objections, and scheduling property tours or consultations."
  useCase="Deployed by real estate agencies to automate lead follow-up, qualify hundreds of leads daily, and convert more prospects into scheduled viewings."
/>
        </div>

        {/* Trust indicator */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Production-grade voice quality</p>
            <p className="text-xs text-neutral-500 mt-0.5">Built on ElevenLabs, Vapi, and Retell AI platforms with custom conversation flows and real CRM integrations.</p>
          </div>
          <div className="sm:ml-auto flex gap-2 flex-wrap">
            {['Vapi', 'ElevenLabs', 'Retell AI', 'Twilio'].map(t => (
              <span key={t} className="text-xs bg-white border border-neutral-200 text-neutral-600 px-2.5 py-1 rounded-full font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}