import { PhoneCall, Workflow, Globe } from 'lucide-react'

export const SITE = {
  name: 'Ahmed Memon',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ahmed-portfolio.xyz',
  email: 'ahmedmemon3344@gmail.com',
  title: 'Ahmed Memon | AI Voice Agents & Automation Engineer',
  description:
    'Ahmed Memon designs and builds AI calling agents, AI automations and agents, and Next.js websites for growing businesses. Lead generation, order confirmation and content systems that run on their own.',
}

export const nav = [
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#workflows', label: 'Workflows', id: 'workflows' },
  { href: '#voice-agents', label: 'Voice agents', id: 'voice-agents' },
  { href: '#websites', label: 'Websites', id: 'websites' },
  { href: '#reviews', label: 'Reviews', id: 'reviews' },
]

export const stats = [
  { value: '1+', label: 'Years building' },
  { value: '40+', label: 'Projects delivered' },
  { value: '3', label: 'Core services' },
]

export const services = [
  {
    icon: PhoneCall,
    title: 'AI Voice Agents',
    text: 'Inbound and outbound calling agents that talk to your customers and book, confirm or qualify on the spot.',
    points: ['Appointment booking', 'Order confirmation', 'Lead qualification'],
  },
  {
    icon: Workflow,
    title: 'AI Automation & Agents',
    text: 'Lead generation, outreach, content and order workflows, plus custom-coded AI agents, that run end to end without anyone touching them.',
    points: ['Outreach pipelines', 'Content systems', 'CRM and calendar sync'],
  },
  {
    icon: Globe,
    title: 'Websites & Dashboards',
    text: 'Fast, SEO-ready websites and admin dashboards built with Next.js, React and Supabase.',
    points: ['Business websites', 'Admin dashboards', 'Technical SEO'],
  },
]

export type Reel = { src: string; poster?: string; title: string; caption: string }

export const workflowReels: Reel[] = [
  { src: '/reels/firstvideo.mp4', title: 'Sales System Automation', caption: 'A sales system workflow, built and running end to end.' },
  { src: '/reels/secondvideo.mp4', title: 'Restaurant Automation', caption: 'Generates content and posts it to social media on its own.' },
  { src: '/reels/thirdvideo.mp4', title: 'E-commerce Automation', caption: 'Creates content for any product, posts it to social media and publishes it on the website.' },
]

export const callingReels: Reel[] = [
  { src: '/reels/firstcalling.mp4', title: 'Website Sales Calls', caption: 'An outbound agent calls leads and pitches websites and services.' },
  { src: '/reels/thirdcalling.mp4', title: 'Auto Care Outbound Calls', caption: 'Reaches out to leads and offers car service and maintenance.' },
  { src: '/reels/secondcalling.mp4', title: 'Real Estate Calling Agent', caption: 'An AI calling agent built for real estate leads.' },
]

export const websites = [
  {
    name: 'Nultat International Group',
    url: 'https://nultatinternationalgroup.com',
    host: 'nultatinternationalgroup.com',
    description: 'Premium business website for an IT company, presenting its services and company profile to international clients.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    name: 'The Pure Himalayan Pink Salt',
    url: 'https://the-pure-salt-3xsx.vercel.app/',
    host: 'the-pure-salt-3xsx.vercel.app',
    description: 'Export website for a Himalayan pink salt manufacturer, with a product catalogue and a sample request form.',
    tags: ['Next.js', 'Catalogue', 'Forms'],
  },
]

export const stack = [
  'JavaScript', 'Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Python', 'FastAPI',
  'PostgreSQL', 'Supabase', 'OpenAI Agents SDK', 'n8n', 'Retell', 'Vapi', 'Docker', 'MCP', 'RAG',
]

export const reviews = [
  { name: 'James Anderson', quote: 'Working with Ahmed was a great experience. He understood our requirements perfectly and delivered exactly what we needed. Highly recommended!' },
  { name: 'Daniel Roberts', quote: 'Excellent work and great communication throughout the project. Everything was handled professionally, and I am very happy with the results.' },
  { name: 'Michael Thompson', quote: 'Really impressed with the quality of work. The entire process was smooth, and the final results exceeded my expectations.' },
  { name: 'Sarah Williams', quote: 'Ahmed did an amazing job! Very professional, responsive, and dedicated. I would definitely recommend working with him.' },
  { name: 'David Miller', quote: 'Great experience from start to finish. Our new website looks modern, professional, and works perfectly. Very satisfied with the outcome!' },
]
