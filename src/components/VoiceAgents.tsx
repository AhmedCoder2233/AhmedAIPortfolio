import { callingReels } from '@/lib/content'
import SectionHead from './SectionHead'
import ReelCard from './ReelCard'

export default function VoiceAgents() {
  return (
    <section id="voice-agents" aria-labelledby="voice-title" className="mx-2 rounded-[28px] bg-white sm:mx-4">
      <div className="section">
        <div className="container-x">
          <SectionHead id="voice-title" title="Hear my AI agents on a real call." text="In these reels I talk to the calling agents myself." />
          <ul className="mt-20 flex flex-wrap justify-center gap-x-10 gap-y-16">
            {callingReels.map((r, i) => (
              <li key={r.src} className="flex w-full justify-center sm:w-auto"><ReelCard reel={r} index={i} speed={i === 1 ? 1 : -0.4} /></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
