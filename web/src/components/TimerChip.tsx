import { useEffect, useState } from 'react'

function fmt(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m)
  return `${h > 0 ? h + ':' : ''}${mm}:${String(s).padStart(2, '0')}`
}

export function labelMinutes(min: number) {
  if (min >= 60) {
    const h = Math.floor(min / 60)
    const r = min % 60
    return `${h} hr${r ? ` ${r} min` : ''}`
  }
  return `${min} min`
}

/** A timer chip inside a step: tap to start a countdown, tap again to reset. */
export function TimerChip({ minutes }: { minutes: number }) {
  const [endsAt, setEndsAt] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    if (endsAt === null) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [endsAt])

  const remaining = endsAt === null ? null : Math.max(0, Math.round((endsAt - now) / 1000))
  const done = remaining === 0

  useEffect(() => {
    if (done && 'vibrate' in navigator) navigator.vibrate?.([200, 100, 200])
  }, [done])

  const running = remaining !== null && !done
  const text = remaining === null ? labelMinutes(minutes) : done ? 'Time’s up' : fmt(remaining)

  return (
    <button
      type="button"
      onClick={() => {
        if (endsAt === null) {
          setNow(Date.now())
          setEndsAt(Date.now() + minutes * 60_000)
        } else setEndsAt(null)
      }}
      aria-label={
        remaining === null ? `Start ${labelMinutes(minutes)} timer` : done ? 'Timer finished — reset' : `Timer running, ${text} left — reset`
      }
      aria-live="polite"
      className={`no-print self-start inline-flex items-center gap-2 min-h-[44px] px-[18px] rounded-full border-[1.5px] qty text-[15px] transition-colors ${
        done
          ? 'bg-fig border-fig text-paper'
          : running
            ? 'bg-blush border-fig text-fig-deep'
            : 'bg-paper border-fig text-fig-deep hover:bg-blush'
      }`}
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6" />
      </svg>
      {text}
    </button>
  )
}
