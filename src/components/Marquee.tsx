import { stack } from '@/lib/content'

export default function Marquee() {
  const row = [...stack, ...stack]
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-white py-6">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-3xl font-extrabold text-ink/85 sm:text-4xl">
            {s} <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
