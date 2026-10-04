import { useId } from 'react'

const BITE = [
  { cx: 196, cy: 52, r: 24 },
  { cx: 214, cy: 84, r: 20 },
  { cx: 176, cy: 30, r: 19 },
  { cx: 206, cy: 66, r: 8 },
]

interface MarkProps {
  size?: number
  /** Below 48px use the simple mark: no fork edge, no crumbs (per the brief). */
  simple?: boolean
  className?: string
}

/** "The Bite" — a pistachio cookie with a bite out of the top right. */
export function LogoMark({ size = 48, simple, className }: MarkProps) {
  const id = 'bite' + useId().replace(/:/g, '')
  const plain = simple ?? size < 48
  return (
    <svg viewBox="0 0 230 230" width={size} height={size} aria-hidden="true" className={className}>
      <defs>
        <mask id={id}>
          <rect width="230" height="230" fill="#fff" />
          {BITE.map((c, i) => (
            <circle key={i} {...c} fill="#000" />
          ))}
        </mask>
      </defs>
      <circle cx="115" cy="118" r="108" fill="#a3b862" mask={`url(#${id})`} />
      {!plain && (
        <>
          <circle
            cx="115" cy="118" r="108" fill="none" stroke="#94a856" strokeWidth="3"
            strokeDasharray="3 9" mask={`url(#${id})`} opacity="0.85"
            transform="scale(0.86) translate(18.7 19.2)"
          />
          <circle cx="222" cy="26" r="3.5" fill="#a3b862" />
          <circle cx="214" cy="12" r="2.2" fill="#a3b862" />
        </>
      )}
    </svg>
  )
}

/** Primary lockup: mark left, "Food:" in Young Serif, tagline in Newsreader italic. */
export function LogoLockup({ reverse = false }: { reverse?: boolean }) {
  return (
    <span className={`flex items-center gap-3.5 ${reverse ? 'text-paper' : 'text-aubergine'}`}>
      <LogoMark size={52} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[30px]">Food:</span>
        <span className="font-serif italic text-[15px] leading-[1.15] mt-1">
          the other
          <br />
          love language
        </span>
      </span>
    </span>
  )
}
