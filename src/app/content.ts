// Client reviews shown in the Reviews section. The section stays hidden while this list is empty.
export type Review = { quote: string; name: string; role?: string }
export const reviews: Review[] = [
  {
    name: 'James Anderson',
    quote: 'Working with Ahmed was a great experience. He understood our requirements perfectly and delivered exactly what we needed. Highly recommended!',
  },
  {
    name: 'Daniel Roberts',
    quote: 'Excellent work and great communication throughout the project. Everything was handled professionally, and I am very happy with the results.',
  },
  {
    name: 'Michael Thompson',
    quote: 'Really impressed with the quality of work. The entire process was smooth, and the final results exceeded my expectations.',
  },
  {
    name: 'Sarah Williams',
    quote: 'Ahmed did an amazing job! Very professional, responsive, and dedicated. I would definitely recommend working with him.',
  },
  {
    name: 'David Miller',
    quote: 'Great experience from start to finish. Our new website looks modern, professional, and works perfectly. Very satisfied with the outcome!',
  },
]

// Add your websites here. The section stays hidden while this list is empty.
export type Site = { name: string; url: string; description: string; tags: string[] }
export const websites: Site[] = [
  {
    name: 'Nultat International Group',
    url: 'https://nultatinternationalgroup.com',
    description: 'Premium business website for an IT company, presenting its services and company profile to international clients.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    name: 'The Pure Himalayan Pink Salt',
    url: 'https://the-pure-salt-3xsx.vercel.app/',
    description: 'Export website for a Himalayan pink salt manufacturer, with a product catalogue and a sample request form.',
    tags: ['Next.js'],
  },
]

export const stack = [
  'JavaScript', 'Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Python', 'FastAPI',
  'PostgreSQL', 'Supabase', 'OpenAI Agents SDK', 'n8n', 'Retell', 'Vapi', 'Docker', 'MCP', 'RAG',
]
