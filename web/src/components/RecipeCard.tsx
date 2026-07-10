import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'
import { FavoriteButton } from './FavoriteButton'

interface Props {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

const STATUS_DOT_COLOR: Record<string, string> = {
  anchor: '#B8793A',
  draft:  '#E8C888',
  backlog: '#D4C4A8',
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }: Props) {
  const hasContent =
    recipe.ingredientGroups.length > 0 || recipe.instructionGroups.length > 0

  return (
    <div
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{ backgroundColor: '#FAF3E7', border: '1px solid #E8C888' }}
    >
      <Link
        to={`/recipe/${recipe.id}`}
        className="block p-5 focus:outline-none"
      >
        <div className="flex items-start gap-2 mb-1">
          <span
            title={recipe.status}
            className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
            style={{ backgroundColor: STATUS_DOT_COLOR[recipe.status] ?? '#D4C4A8' }}
          />
          <h2 className="font-serif text-lg leading-snug transition-colors" style={{ color: '#3D2817' }}>
            {recipe.title}
          </h2>
        </div>
        <p className="ml-4 text-xs mt-0.5" style={{ color: '#8B5A2B' }}>{recipe.category}</p>
        {!hasContent && (
          <p className="ml-4 mt-2 text-xs italic" style={{ color: '#B8793A' }}>Coming soon</p>
        )}
      </Link>
      <div className="absolute top-4 right-4">
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(recipe.id)}
          size="sm"
        />
      </div>
    </div>
  )
}
