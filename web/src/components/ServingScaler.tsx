const SCALES = [0.5, 1, 1.5, 2, 3] as const

interface Props {
  scale: number
  onChange: (s: number) => void
  baseServings?: string
}

export function ServingScaler({ scale, onChange, baseServings }: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm" style={{ color: '#8B5A2B' }}>
        {baseServings ? `Serves ${baseServings}` : 'Scale'}
      </span>
      <div className="flex items-center gap-1 rounded-full p-0.5" style={{ backgroundColor: '#E8C888' }}>
        {SCALES.map(s => (
          <button
            key={s}
            onClick={() => onChange(s)}
            aria-pressed={scale === s}
            className="px-3 py-1 rounded-full text-sm font-medium transition-colors focus:outline-none"
            style={
              scale === s
                ? { backgroundColor: '#3D2817', color: '#FAF3E7' }
                : { color: '#6B4226' }
            }
          >
            {s === 1 ? '1×' : `${s}×`}
          </button>
        ))}
      </div>
    </div>
  )
}
