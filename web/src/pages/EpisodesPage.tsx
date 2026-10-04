import { Link } from 'react-router-dom'

function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 9 10" aria-hidden="true">
      <path d="M1 0.5 L9 5 L1 9.5 Z" fill="#2B1430" />
    </svg>
  )
}

export function EpisodesPage() {
  return (
    <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-8 pt-8 pb-24">
      <p className="label text-pistachio-deep">The kitchen vlog</p>
      <h1 className="font-display text-[clamp(2.4rem,5vw,3.5rem)] leading-none mt-4 mb-5">Episodes</h1>
      <p className="font-serif italic text-2xl leading-snug text-aubergine-soft max-w-[640px]">
        Cooking for the people we love, with the camera rolling.
      </p>

      <div className="mt-12 rounded-card border border-blush-border bg-blush px-6 py-16 sm:py-20 flex flex-col items-center text-center gap-5">
        <span className="w-[72px] h-[72px] rounded-full bg-pistachio flex items-center justify-center">
          <PlayIcon size={24} />
        </span>
        <h2 className="font-display text-[28px] leading-tight">The first episodes are on their way.</h2>
        <p className="text-lg leading-relaxed max-w-[520px]">
          When an episode is up, it will live here — with its recipe one tap away.
        </p>
        <Link to="/contents" className="btn-fig mt-2">Browse the recipes</Link>
      </div>
    </main>
  )
}
