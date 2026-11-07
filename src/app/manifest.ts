import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ahmed Memon | AI Voice Agents & Automation', short_name: 'Ahmed Memon', start_url: '/',
    display: 'standalone', background_color: '#050b18', theme_color: '#050b18',
    icons: [{ src: '/icon.png', sizes: '256x256', type: 'image/png' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  }
}
