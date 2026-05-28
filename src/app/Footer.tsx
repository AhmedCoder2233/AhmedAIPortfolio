'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleEmailClick = () => {
    window.location.href = 'mailto:ahmedmemon3344@gmail.com'
  }

  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Copyright */}
          <div className="text-sm text-neutral-400">
            © {currentYear} Ahmed Memon. All rights reserved.
          </div>

          {/* Center - Quick links */}
          <div className="flex gap-6 text-sm">
            <a href="#systems" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              Systems
            </a>
            <a href="#voice-ai" className="text-neutral-500 hover:text-neutral-900 transition-colors">
              Voice AI
            </a>
          </div>

          {/* Right side - Email */}
          <button
            onClick={handleEmailClick}
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ahmedmemon3344@gmail.com
          </button>
        </div>
      </div>
    </footer>
  )
}