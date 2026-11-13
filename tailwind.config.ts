import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { bg: '#F5F2EB', paper: '#FFFFFF', ink: '#0B0B10', muted: '#5C606C', line: 'rgba(11,11,16,0.1)', accent: '#FF4A1C' },
      fontFamily: {
        display: ['var(--fd)', 'Georgia', 'serif'],
        sans: ['var(--fb)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        spin360: { to: { transform: 'rotate(360deg)' } },
        wave: { '0%,100%': { transform: 'scaleY(.35)' }, '50%': { transform: 'scaleY(1)' } },
      },
      animation: { wave: 'wave 1s ease-in-out infinite', marquee: 'marquee 40s linear infinite', float: 'float 6s ease-in-out infinite', spin360: 'spin360 18s linear infinite' },
    },
  },
  plugins: [],
}
export default config
