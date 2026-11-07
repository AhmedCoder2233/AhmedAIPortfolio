import Image from 'next/image'
import { nav, SITE } from '@/lib/content'

export default function Footer() {
  return (
    <footer>
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <a href="#top" className="flex items-center gap-3" aria-label="Ahmed Memon, back to top">
          <Image src="/images/logo.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full" loading="lazy" />
          <span className="font-display text-lg font-extrabold">Ahmed Memon</span>
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 text-sm font-semibold text-muted">
            {nav.map((n) => <li key={n.id}><a href={n.href} className="inline-flex min-h-[44px] items-center transition hover:text-ink">{n.label}</a></li>)}
            <li><a href={`mailto:${SITE.email}`} className="inline-flex min-h-[44px] items-center transition hover:text-ink">Email</a></li>
          </ul>
        </nav>
        <p className="text-sm text-muted">© {new Date().getFullYear()} Ahmed Memon</p>
      </div>
    </footer>
  )
}
