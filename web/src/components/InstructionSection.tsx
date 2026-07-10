import type { InstructionGroup } from '../types/recipe'

interface Props {
  group: InstructionGroup
  startIndex: number
}

function ClockIcon() {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block mr-1 -mt-0.5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block mr-1 -mt-0.5"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function InstructionSection({ group, startIndex }: Props) {
  return (
    <div>
      {group.section && (
        <h3 className="instruction-section-header">{group.section}</h3>
      )}
      <ol className="space-y-5" start={startIndex}>
        {group.steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center mt-0.5"
              style={{ backgroundColor: '#E8C888', color: '#6B4226' }}
            >
              {startIndex + i}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] leading-relaxed" style={{ color: '#3D2817' }}>{step.text}</p>

              {step.timerMinutes !== undefined && (
                <p className="mt-1.5 text-xs" style={{ color: '#8B5A2B' }}>
                  <ClockIcon />
                  {step.timerMinutes >= 60
                    ? `${Math.floor(step.timerMinutes / 60)}h${step.timerMinutes % 60 > 0 ? ` ${step.timerMinutes % 60}m` : ''}`
                    : `${step.timerMinutes} min`}
                </p>
              )}

              {step.donenessCue && (
                <p className="doneness-cue">
                  <EyeIcon />
                  {step.donenessCue}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
