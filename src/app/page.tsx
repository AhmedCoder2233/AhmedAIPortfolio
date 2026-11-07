import Intro from '@/components/Intro'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Statement from '@/components/Statement'
import Services from '@/components/Services'
import Workflows from '@/components/Workflows'
import VoiceAgents from '@/components/VoiceAgents'
import Websites from '@/components/Websites'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { SITE, services } from '@/lib/content'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: 'Ahmed Memon', inLanguage: 'en',
      publisher: { '@id': `${SITE.url}/#person` },
    },
    {
      '@type': 'Person', '@id': `${SITE.url}/#person`, name: 'Ahmed Memon', url: SITE.url,
      image: `${SITE.url}/images/logo.webp`, email: SITE.email,
      jobTitle: 'AI Voice Agents & Automation Engineer',
      description: SITE.description,
      knowsAbout: ['AI voice agents', 'AI automation', 'AI agents', 'Retell AI', 'Vapi', 'Next.js', 'Supabase', 'RAG', 'MCP'],
    },
    {
      '@type': 'ProfessionalService', '@id': `${SITE.url}/#service`, name: 'Ahmed Memon, AI Automation & Voice Agents', url: SITE.url,
      image: `${SITE.url}/images/ahmed-memon-portrait.webp`, areaServed: 'Worldwide', provider: { '@id': `${SITE.url}/#person` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Services',
        itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text } })),
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <Intro />
      <a href="#main" className="sr-only z-[120] rounded-full bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Statement />
        <Services />
        <Workflows />
        <VoiceAgents />
        <Websites />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
