import type { ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const
export const upAt = (base: number) => (d: number) => ({
  initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { delay: base + d, duration: 0.9, ease },
})
export function HeroShell({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id="top" aria-labelledby={id} className="relative overflow-hidden pb-14 pt-28 sm:pt-32">
      <div className="container-x relative">{children}</div>
    </section>
  )
}
