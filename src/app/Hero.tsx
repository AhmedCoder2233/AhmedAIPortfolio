'use client'

import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleGetInTouch = () => {
    window.location.href = 'mailto:ahmedmemon3344@gmail.com'
  }

  return (
    <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-50/50" />

      {/* Decorative orbs - softer and more subtle */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-indigo-50 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-16 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-black to-black flex items-center justify-center">
            <span className="text-white text-xs font-semibold">AM</span>
          </div>
          <span className="font-semibold text-neutral-900 text-sm tracking-tight">Ahmed Memon</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600 font-medium">
          <a href="#voice-ai" className="hover:text-neutral-900 transition-colors">Voice AI</a>
          <a href="#systems" className="hover:text-neutral-900 transition-colors">AI Systems</a>
                  </div>

        <button
          onClick={handleGetInTouch}
          className="bg-neutral-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-800 transition-all duration-200 hover:shadow-lg"
        >
          Get in Touch
        </button>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-12 pb-24 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-1.5 mb-8 shadow-sm transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-neutral-600">Available for new projects</span>
        </div>

        {/* Name */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 mb-4 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}
        >
          Ahmed Memon
        </h1>

        {/* Title */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="h-px w-12 bg-blue-200" />
          <p className="text-sm font-medium tracking-widest text-blue-600 uppercase">
            AI Automation & Voice AI Developer
          </p>
          <div className="h-px w-12 bg-blue-200" />
        </div>

        {/* Tagline */}
        <p
          className={`max-w-2xl text-xl md:text-2xl text-neutral-500 font-light leading-relaxed mb-10 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          I design and build AI systems that{' '}
          <span className="text-neutral-900 font-medium">automate lead handling, sales, calls,</span>
          {' '}and business workflows.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-black font-bold">Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-neutral-300 to-transparent" />
      </div>
    </section>
  )
}