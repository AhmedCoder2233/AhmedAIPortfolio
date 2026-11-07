import { workflowReels } from '@/lib/content'
import SectionHead from './SectionHead'
import ReelCard from './ReelCard'

export default function Workflows() {
  return (
    <section id="workflows" aria-labelledby="workflows-title" className="section">
      <div className="container-x">
        <SectionHead id="workflows-title" title="Automation workflows, in motion." text="Short reels where I show how each AI automation and agent is built and how it runs." />
        <ul className="mt-20 flex flex-wrap justify-center gap-x-10 gap-y-16">
          {workflowReels.map((r, i) => (
            <li key={r.src} className="flex w-full justify-center sm:w-auto"><ReelCard reel={r} index={i} speed={i === 1 ? 1 : -0.4} /></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
