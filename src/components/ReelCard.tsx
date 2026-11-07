'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Reel } from '@/lib/content'

let current: HTMLVideoElement | null = null

const fmt = (t: number) => {
  if (!Number.isFinite(t) || t < 0) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function ReelCard({ reel, index, speed = 0 }: { reel: Reel; index: number; speed?: number }) {
  const box = useRef<HTMLElement>(null)
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [failed, setFailed] = useState(false)
  const { scrollYProgress } = useScroll({ target: box, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 70, speed * -70])
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1])

  const sync = (v: HTMLVideoElement) => {
    setTime(v.currentTime)
    if (Number.isFinite(v.duration) && v.duration > 0) setDuration(v.duration)
  }

  useEffect(() => {
    const v = ref.current
    if (v && v.readyState >= 1) sync(v) // metadata may have loaded before React attached its listeners
    return () => { if (current === ref.current) current = null }
  }, [])

  const toggle = async () => {
    const v = ref.current
    if (!v || failed) return
    if (v.paused) {
      if (current && current !== v) current.pause()
      current = v
      try { await v.play() } catch { /* blocked */ }
    } else v.pause()
  }

  const seekTo = (t: number) => {
    const v = ref.current
    if (!v) return
    const max = Number.isFinite(v.duration) ? v.duration : t
    v.currentTime = Math.min(Math.max(t, 0), max)
    setTime(v.currentTime)
  }

  // `#t=0.1` makes the browser load and show a real frame of the video as the cover (works on iOS too).
  const src = reel.src.includes('#') ? reel.src : `${reel.src}#t=0.1`
  const iconBtn = 'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink transition hover:bg-white'

  return (
    <motion.figure ref={box} style={{ y, scale }} className="group w-full max-w-[290px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] bg-ink">
        {!failed && (
          <video
            ref={ref} src={src} poster={reel.poster} preload="metadata" playsInline muted={muted} loop
            aria-label={`${reel.title} video`} className="absolute inset-0 h-full w-full object-cover"
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
            onLoadedMetadata={(e) => sync(e.currentTarget)} onLoadedData={(e) => sync(e.currentTarget)}
            onDurationChange={(e) => sync(e.currentTarget)} onCanPlay={(e) => sync(e.currentTarget)}
            onTimeUpdate={(e) => sync(e.currentTarget)}
            onError={() => setFailed(true)}
          />
        )}
        {failed && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#1B1B22]" />}
        <button type="button" onClick={toggle} disabled={failed} aria-label={failed ? `${reel.title} coming soon` : `${playing ? 'Pause' : 'Play'} ${reel.title}`} className="absolute inset-0 flex cursor-pointer items-center justify-center disabled:cursor-default">
          <span className={`flex h-[68px] w-[68px] items-center justify-center rounded-full bg-accent text-white transition duration-300 ${playing ? 'scale-75 opacity-0 group-hover:opacity-100' : 'group-hover:scale-110'}`}>
            {failed ? <span className="text-xs font-bold">Soon</span> : playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="translate-x-0.5" />}
          </span>
        </button>
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">Reel {String(index + 1).padStart(2, '0')}</span>
        {!failed && (
          <>
            <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute reel' : 'Mute reel'} className={`${iconBtn} absolute right-3 top-3 z-10`}>
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl bg-ink/70 px-3 pb-1.5 pt-2.5 text-white">
              <div className="flex items-center justify-between text-xs font-semibold tabular-nums">
                <span>{fmt(time)}</span>
                <span>{duration > 0 ? fmt(duration) : '--:--'}</span>
              </div>
              <input
                type="range" min={0} max={duration || 1} step={0.05} value={Math.min(time, duration || 0)}
                onChange={(e) => seekTo(Number(e.target.value))}
                style={{ '--p': `${duration ? (Math.min(time, duration) / duration) * 100 : 0}%` } as React.CSSProperties}
                aria-label={`Seek ${reel.title}`} className="reel-range mt-0.5"
              />
            </div>
          </>
        )}
      </div>
      <figcaption className="mt-5 px-1">
        <p className="font-display text-xl font-bold leading-tight">{reel.title}</p>
        <p className="mt-1 text-sm text-muted">{reel.caption}</p>
      </figcaption>
    </motion.figure>
  )
}
