import type { IngredientGroup } from '../types/recipe'
import { scaleIngredient } from '../lib/scaleIngredient'

interface Props {
  group: IngredientGroup
  scale: number
}

export function IngredientSection({ group, scale }: Props) {
  return (
    <div>
      {group.section && (
        <h3 className="ingredient-section-header">{group.section}</h3>
      )}
      <ul className="space-y-2">
        {group.items.map(item => (
          <li key={item.id} className="flex gap-2 text-[15px] leading-snug text-stone-800">
            <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-butter-400" />
            <span>{scaleIngredient(item.text, scale)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
