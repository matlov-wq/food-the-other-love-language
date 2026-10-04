import type { IngredientGroup } from '../types/recipe'
import { scaleIngredient } from '../lib/scaleIngredient'
import { splitQuantity } from '../lib/format'

interface Props {
  group: IngredientGroup
  scale: number
}

export function IngredientSection({ group, scale }: Props) {
  return (
    <div className="mt-6">
      {group.section && <h3 className="label text-fig-deep mb-2">{group.section}</h3>}
      <ul>
        {group.items.map(item => {
          const [qty, rest] = splitQuantity(scaleIngredient(item.text, scale))
          return (
            <li
              key={item.id}
              className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 py-2.5 border-b border-blush-border text-lg leading-snug"
            >
              <span className="qty text-[15px] text-fig-deep pt-0.5">{qty}</span>
              <span>{rest}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
