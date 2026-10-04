const SCALES = [0.5, 1, 1.5, 2, 3] as const

interface Props {
  scale: number
  onChange: (s: number) => void
}

export function ServingScaler({ scale, onChange }: Props) {
  return (
    <div role="group" aria-label="Batch size" className="no-print flex gap-1 bg-paper border border-blush-border rounded-full p-1">
      {SCALES.map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          aria-pressed={scale === s}
          className={`min-w-[44px] min-h-[40px] px-2 rounded-full qty text-sm transition-colors ${
            scale === s ? 'bg-fig text-paper' : 'text-aubergine hover:bg-blush'
          }`}
        >
          {s === 0.5 ? '½' : s === 1.5 ? '1½' : s}×
        </button>
      ))}
    </div>
  )
}
