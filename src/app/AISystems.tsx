'use client'

import { useState, useEffect, useRef } from 'react'

interface FlowNode {
  icon: string
  label: string
  sub: string
}

interface FlowSystem {
  id: string
  tab: string
  title: string
  desc: string
  color: {
    dot: string
    fill: string
    text: string
    border: string
    arrow: string
    hex: string
  }
  metric: { value: string; label: string }
  nodes: FlowNode[]
}

const systems: FlowSystem[] = [
  {
    id: 'lead',
    tab: 'Lead Qualification',
    title: 'AI Lead Qualification + Booking',
    desc: 'Fully autonomous lead-to-booked-call pipeline. The AI calls every new lead within 60 seconds, qualifies them, and books directly into your calendar.',
    color: {
      dot: 'bg-blue-500',
      fill: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-300',
      arrow: '#93c5fd',
      hex: '#3b82f6',
    },
    metric: { value: '< 60s', label: 'Response time' },
    nodes: [
      { icon: '🎯', label: 'Lead captured', sub: 'Form / Ad click' },
      { icon: '📞', label: 'AI voice call', sub: 'Instant outreach' },
      { icon: '🧠', label: 'Qualification', sub: 'Budget · Need · Timeline' },
      { icon: '⚡', label: 'AI scoring', sub: 'Lead analysed' },
      { icon: '📅', label: 'Auto-booking', sub: 'Calendar scheduled' },
      { icon: '✅', label: 'CRM updated', sub: 'Full sync' },
    ],
  },
  {
    id: 'whatsapp',
    tab: 'WhatsApp Sales',
    title: 'AI WhatsApp Sales Automation',
    desc: "Engages every new lead via WhatsApp with a personalised AI conversation — qualifies intent, scores the lead, and alerts your team only when it's hot.",
    color: {
      dot: 'bg-emerald-500',
      fill: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-300',
      arrow: '#6ee7b7',
      hex: '#10b981',
    },
    metric: { value: '3x', label: 'Conversion uplift' },
    nodes: [
      { icon: '💬', label: 'New lead', sub: 'Any source' },
      { icon: '📱', label: 'WA response', sub: '< 30 seconds' },
      { icon: '🤖', label: 'AI conversation', sub: 'Needs · Budget · Intent' },
      { icon: '📊', label: 'Lead scoring', sub: 'Hot / Warm / Cold' },
      { icon: '🔔', label: 'Hot lead alert', sub: 'Team notified' },
      { icon: '🏆', label: 'Deal closed', sub: 'Booking confirmed' },
    ],
  },
  {
    id: 'followup',
    tab: 'Follow-up Engine',
    title: 'AI Follow-up & Conversion Engine',
    desc: 'Re-engages cold leads with hyper-personalised messages across channels — tracking every interaction and attributing every conversion.',
    color: {
      dot: 'bg-amber-500',
      fill: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-300',
      arrow: '#fcd34d',
      hex: '#f59e0b',
    },
    metric: { value: '40%', label: 'Reactivation rate' },
    nodes: [
      { icon: '❄️', label: 'Inactive lead', sub: 'Gone cold' },
      { icon: '🔄', label: 'Follow-up sequence', sub: 'Multi-channel' },
      { icon: '✉️', label: 'Personalised message', sub: 'Name · history · need' },
      { icon: '💡', label: 'Re-engagement', sub: 'Response detected' },
      { icon: '📈', label: 'Conversion tracked', sub: 'Full attribution' },
      { icon: '✅', label: 'CRM updated', sub: 'Full sync' },
    ],
  },
]

const TECH_STACK = ['n8n', 'OpenAI', 'Google Calendar API', 'Vapi', 'Retell', 'Twilio', 'CRM']

const STEP_INTERVAL = 1200 // ms per step — comfortable pace
const PAUSE_AFTER = 2200  // ms pause before restart

function FlowDiagram({ system, stepIndex }: { system: FlowSystem; stepIndex: number }) {
  const { nodes, color } = system
  const maxNodes = 6 // Maximum number of nodes across all systems (lead has 6)

  return (
    <div className="w-full">
      {/* Node track — using grid for consistent spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {nodes.map((node, i) => {
          const isPassed = stepIndex > i
          const isActive = stepIndex === i
          const isInactive = stepIndex < i

          return (
            <div key={i} className="relative">
              {/* Node card */}
              <div
                className={[
                  'relative flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all duration-500',
                  'w-full min-w-[120px]',
                  isPassed
                    ? `${color.fill} ${color.border}`
                    : isActive
                    ? `${color.fill} ${color.border} shadow-lg`
                    : 'bg-white border-neutral-100',
                  isInactive ? 'opacity-40' : 'opacity-100',
                  isActive ? 'scale-105' : 'scale-100',
                ].join(' ')}
              >
                {/* Check badge */}
                {isPassed && (
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                    style={{ background: color.hex }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}

                {/* Active pulse ring */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-xl animate-ping opacity-20"
                    style={{ background: color.hex }}
                  />
                )}

                <span className="text-2xl mb-1.5 relative z-10">{node.icon}</span>
                <span
                  className={[
                    'text-[11px] font-semibold text-center leading-tight relative z-10',
                    isPassed || isActive ? color.text : 'text-neutral-500',
                  ].join(' ')}
                >
                  {node.label}
                </span>
                <span className="text-[9px] text-neutral-400 text-center mt-1 leading-tight relative z-10">
                  {node.sub}
                </span>
              </div>

              {/* Arrow - hidden on grid layout */}
              {i < nodes.length - 1 && i % 2 === 0 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    className="transition-opacity duration-500"
                    style={{ opacity: stepIndex > i ? 1 : 0.15 }}
                  >
                    <line x1="0" y1="8" x2="18" y2="8" stroke={color.arrow} strokeWidth="2" />
                    <polygon points="18,4 24,8 18,12" fill={color.arrow} />
                  </svg>
                </div>
              )}
            </div>
          )
        })}

        {/* Add placeholder cards for consistent layout */}
        {nodes.length < maxNodes && 
          Array(maxNodes - nodes.length).fill(0).map((_, i) => (
            <div key={`placeholder-${i}`} className="relative opacity-0 pointer-events-none">
              <div className="w-full min-w-[120px] h-[110px]"></div>
            </div>
          ))
        }
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-[3px] bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-in-out"
          style={{
            background: color.hex,
            width: stepIndex < 0 ? '0%' : `${((stepIndex + 1) / nodes.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

export default function AISystems() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(-1)

  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeRef = useRef(0)

  const system = systems[active]

  function startAnim(nodeCount: number) {
    // Clear existing animation if any
    if (animRef.current) {
      clearInterval(animRef.current)
      animRef.current = null
    }
    
    setStep(0)
    let s = 0

    animRef.current = setInterval(() => {
      s += 1
      if (s >= nodeCount) {
        // Completed all nodes, pause then restart from beginning
        clearInterval(animRef.current!)
        animRef.current = null
        
        // Wait and then restart the animation
        setTimeout(() => {
          setStep(-1) // Reset all highlights
          setTimeout(() => {
            startAnim(nodeCount) // Restart animation
          }, 100)
        }, PAUSE_AFTER)
        return
      }
      setStep(s)
    }, STEP_INTERVAL)
  }

  function switchTo(i: number) {
    // Clear current animation
    if (animRef.current) {
      clearInterval(animRef.current)
      animRef.current = null
    }
    
    activeRef.current = i
    setActive(i)
    setStep(-1)
    
    // Start new animation for selected system
    setTimeout(() => startAnim(systems[i].nodes.length), 100)
  }

  useEffect(() => {
    // Start animation for first system
    startAnim(systems[0].nodes.length)
    
    // Cleanup on unmount
    return () => {
      if (animRef.current) {
        clearInterval(animRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="systems" className="py-24 px-6 lg:px-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Automation Systems
          </div>
          <h2
            className="text-4xl font-light text-neutral-900 tracking-tight mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Enterprise-grade automation<br />
            <span className="italic">built to run your business</span>
          </h2>
          <p className="text-neutral-500 leading-relaxed">
            Each system is a fully autonomous AI pipeline — no manual steps, no missed leads, no delays.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {systems.map((s, i) => (
            <button
              key={s.id}
              onClick={() => switchTo(i)}
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
                active === i
                  ? 'text-white shadow-md border-transparent'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-neutral-700',
              ].join(' ')}
              style={active === i ? { background: s.color.hex } : {}}
            >
              <span>{s.nodes[0].icon}</span>
              {s.tab}
            </button>
          ))}
        </div>

        {/* ── Main panel ── */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">

          {/* Panel header */}
          <div className={`px-6 py-5 border-b border-neutral-100 ${system.color.fill}`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${system.color.dot}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${system.color.text}`}>
                    Live Demo
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">{system.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{system.desc}</p>
              </div>
              <div className="flex-shrink-0 sm:text-right bg-white/60 rounded-xl px-4 py-3 self-start">
                <div className={`text-2xl font-bold ${system.color.text}`}>{system.metric.value}</div>
                <div className="text-xs text-neutral-400 font-medium mt-0.5">{system.metric.label}</div>
              </div>
            </div>
          </div>

          {/* Flow diagram — full width, no overflow clipping */}
          <div className="p-6">
            <FlowDiagram system={system} stepIndex={step} />
          </div>

          {/* Tech stack footer */}
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium mr-1">Built with:</span>
            {TECH_STACK.map(tech => (
              <span
                key={tech}
                className="text-xs bg-white border border-neutral-200 text-neutral-600 px-2.5 py-1 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}