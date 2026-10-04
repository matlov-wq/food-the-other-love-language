import type { InstructionGroup } from '../types/recipe'
import { TimerChip, labelMinutes } from './TimerChip'

interface Props {
  group: InstructionGroup
  startIndex: number
  large?: boolean
}

export function InstructionSection({ group, startIndex, large }: Props) {
  return (
    <div className="mt-8 first:mt-6">
      {group.section && <h3 className="label text-fig-deep pb-1">{group.section}</h3>}
      <ol>
        {group.steps.map((step, i) => (
          <li
            key={i}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 py-6 border-b border-blush-border break-inside-avoid"
          >
            <span className="font-display text-[32px] leading-none text-fig">{startIndex + i}</span>
            <div className="flex flex-col gap-3">
              <p className={`leading-[1.6] ${large ? 'text-[26px]' : 'text-lg'}`}>{step.text}</p>
              {step.donenessCue && (
                <p className={`leading-normal ${large ? 'text-[24px]' : 'text-lg'}`}>
                  <span className="label text-fig-deep mr-2">Done when</span>
                  <span className="italic">{step.donenessCue}</span>
                </p>
              )}
              {step.timerMinutes !== undefined && step.timerMinutes > 0 && (
                <>
                  <TimerChip minutes={step.timerMinutes} />
                  <span className="hidden print:inline qty text-sm text-fig-deep">⏱ {labelMinutes(step.timerMinutes)}</span>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
