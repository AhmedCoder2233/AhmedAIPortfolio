# Ahmed Memon Portfolio (Next.js 14)

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## Before deploying
1. Set your real domain: create `.env.local` with `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
   (used for canonical URL, Open Graph, sitemap, robots and JSON-LD).
2. Drop your 6 reels into `public/reels/` (see the README.txt there).
3. Edit text, reels, websites, reviews in `src/lib/content.ts`.

## Where things are
- `src/components/` : Intro, Header, Hero, Services, Workflows, VoiceAgents, Websites, Reviews, Contact, Footer
- `src/app/` : layout (SEO metadata), sitemap.ts, robots.ts, manifest.ts, icon.png, apple-icon.png, favicon.ico, opengraph-image.png
- `public/images/` : logo and portrait (WebP)
- `public/audio/` : call recordings
