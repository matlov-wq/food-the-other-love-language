const SCALES = [0.5, 1, 1.5, 2, 3] as const

interface Props {
  scale: number
  onChange: (s: number) => void
  baseServings?: string
}

export function ServingScaler({ scale, onChange, baseServings }: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-stone-500">
        {baseServings ? `Serves ${baseServings}` : 'Scale'}
      </span>
      <div className="flex items-center gap-1 bg-stone-100 rounded-full p-0.5">
        {SCALES.map(s => (
          <button
            key={s}
            onClick={() => onChange(s)}
            aria-pressed={scale === s}
            className={`
              px-3 py-1 rounded-full text-sm font-medium transition-colors
              focus:outline-none focus-visible:ring-2 focus-visible:ring-butter-500
              ${scale === s
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
              }
            `}
          >
            {s === 1 ? '1×' : `${s}×`}
          </button>
        ))}
      </div>
    </div>
  )
}
