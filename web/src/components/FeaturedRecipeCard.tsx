import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'

interface Props {
  recipe: Recipe
}

const hasContent = (r: Recipe) =>
  r.ingredientGroups.length > 0 || r.instructionGroups.length > 0

export function FeaturedRecipeCard({ recipe }: Props) {
  const ready = hasContent(recipe)

  if (!ready) {
    return (
      <div className="flex-shrink-0 w-64 rounded-2xl p-5 border" style={{ backgroundColor: '#F3E4C8', borderColor: '#E8C888' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#B8793A' }}>
          {recipe.category}
        </p>
        <h3 className="font-serif text-lg leading-snug mb-1" style={{ color: '#8B5A2B' }}>
          {recipe.title}
        </h3>
        <p className="text-xs italic" style={{ color: '#B8793A' }}>Coming soon</p>
      </div>
    )
  }

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="flex-shrink-0 w-64 rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow group"
      style={{ backgroundColor: '#FAF3E7', borderColor: '#E8C888' }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#B8793A' }}>
        {recipe.category}
      </p>
      <h3 className="font-serif text-lg leading-snug mb-3 transition-colors" style={{ color: '#3D2817' }}>
        {recipe.title}
      </h3>
      {recipe.totalTime && (
        <p className="text-xs" style={{ color: '#8B5A2B' }}>{recipe.totalTime}</p>
      )}
      <p className="mt-3 text-xs font-medium" style={{ color: '#B8793A' }}>
        View recipe →
      </p>
    </Link>
  )
}
