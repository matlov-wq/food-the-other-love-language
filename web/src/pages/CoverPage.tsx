import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogoMark } from '../components/Logo'

const NAV = [
  { to: '/contents', label: 'Contents' },
  { to: '/episodes', label: 'Episodes' },
  { to: '/about', label: 'About' },
]

/** The landing page, set like the front of a book: title, subtitle, art, authors. */
export function CoverPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    // Match the browser chrome to the cover while it's showing
    const meta = document.querySelector('meta[name="theme-color"]')
    const prev = meta?.getAttribute('content')
    meta?.setAttribute('content', '#2B1430')
    return () => {
      if (prev) meta?.setAttribute('content', prev)
    }
  }, [])

  return (
    <div className="min-h-[100svh] bg-aubergine text-paper p-3 sm:p-6 flex">
      <div className="relative flex-1 flex flex-col overflow-hidden border border-paper/25 px-5 sm:px-12 lg:px-16 py-6 sm:py-10">
        {/* Top of the cover */}
        <header className="relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="label text-paper/70">A cookbook &amp; kitchen vlog</p>
          <nav aria-label="Main" className="flex gap-6 sm:gap-8">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} className="label text-paper py-3 hover:text-pistachio transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Cover art: the cookie, bite and crumbs in full view. Type never sits on it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative self-end w-[58vw] max-w-[320px] mt-8 sm:mt-0 sm:max-w-none sm:absolute sm:right-[6%] sm:top-1/2 sm:-translate-y-[54%] sm:w-[min(60vh,38vw)]"
        >
          <LogoMark size={1000} className="w-full h-auto" />
        </div>

        {/* Title block */}
        <div className="relative z-10 flex-1 flex flex-col justify-end sm:justify-center pt-6 sm:pt-0 pb-10 sm:max-w-[58%]">
          <h1 className="leading-none">
            <span className="block font-display text-[clamp(5rem,13vw,13rem)] leading-[0.85] tracking-[-0.02em]">
              Food:
            </span>
            <span className="block font-serif italic text-[clamp(2.1rem,5.6vw,4.75rem)] leading-[1.05] mt-3 sm:mt-5">
              the other
              <br />
              love language
            </span>
          </h1>
          <p className="label text-pistachio mt-8 sm:mt-10 max-w-[28rem] leading-relaxed">
            Recipes for intention, care, and showing&nbsp;up
          </p>
        </div>

        {/* Foot of the cover: authors and the way in */}
        <footer className="relative z-10 flex flex-wrap items-end justify-between gap-6 pt-6 border-t border-paper/25">
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-[28px] sm:text-[32px] leading-none">Mat &amp; Benny</span>
            <span className="font-serif italic text-lg text-paper/80">Some people write cards, we cook.</span>
          </div>
          <Link to="/contents" className="btn-pistachio px-7 text-[15px]">
            Let’s Cook!
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </footer>
      </div>
    </div>
  )
}
