import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getRecipeById } from '../data/recipes'
import { IngredientSection } from '../components/IngredientSection'
import { InstructionSection } from '../components/InstructionSection'
import { IfYouFeelLikeIt } from '../components/IfYouFeelLikeIt'
import { ServingScaler } from '../components/ServingScaler'
import { FavoriteButton } from '../components/FavoriteButton'
import { useFavorites } from '../hooks/useFavorites'

function BackIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const recipe = id ? getRecipeById(id) : undefined
  const [scale, setScale] = useState(1)
  const { isFavorite, toggle } = useFavorites()

  if (!recipe) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
        <p className="text-stone-500">Recipe not found.</p>
        <Link to="/" className="text-butter-600 underline text-sm">
          Back to all recipes
        </Link>
      </div>
    )
  }

  const hasContent =
    recipe.ingredientGroups.length > 0 || recipe.instructionGroups.length > 0

  const hasTimes = recipe.prepTime || recipe.cookTime || recipe.totalTime

  // Compute cumulative step index for numbering across sections
  let stepCounter = 1
  const instructionGroupsWithStart = recipe.instructionGroups.map(group => {
    const start = stepCounter
    stepCounter += group.steps.length
    return { group, start }
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF3E7' }}>
      <header className="sticky top-0 z-10 shadow-sm text-white" style={{ backgroundColor: '#3D2817' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors -ml-1"
          >
            <BackIcon />
          </button>
          <span className="text-stone-400 text-xs font-medium tracking-wide truncate">
            {recipe.category}
          </span>
          <FavoriteButton
            isFavorite={isFavorite(recipe.id)}
            onToggle={() => toggle(recipe.id)}
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Title */}
        <h1 className="font-serif text-3xl font-semibold text-stone-900 leading-tight mb-3">
          {recipe.title}
        </h1>

        {/* Story / headnote */}
        {recipe.story && (
          <p className="font-serif italic text-stone-500 text-base leading-relaxed mb-5 border-l-2 border-stone-200 pl-3">
            {recipe.story}
          </p>
        )}

        {/* Times */}
        {hasTimes && (
          <div className="flex flex-wrap gap-4 mb-5">
            {recipe.prepTime && (
              <TimeStat label="Prep" value={recipe.prepTime} />
            )}
            {recipe.cookTime && (
              <TimeStat label="Cook" value={recipe.cookTime} />
            )}
            {recipe.totalTime && (
              <TimeStat label="Total" value={recipe.totalTime} />
            )}
          </div>
        )}

        {/* Serving scaler */}
        {hasContent && (
          <div className="mb-6 pb-5 border-b border-stone-200">
            <ServingScaler
              scale={scale}
              onChange={setScale}
              baseServings={recipe.servings || undefined}
            />
          </div>
        )}

        {!hasContent && (
          <div className="py-10 text-center">
            <p className="text-stone-400 text-sm italic">
              This recipe is coming soon — content is being developed.
            </p>
          </div>
        )}

        {/* Ingredients */}
        {recipe.ingredientGroups.length > 0 && (
          <section className="mb-8">
            <h2 className="section-label">Ingredients</h2>
            <div className="space-y-2">
              {recipe.ingredientGroups.map((group, i) => (
                <IngredientSection key={i} group={group} scale={scale} />
              ))}
            </div>
          </section>
        )}

        {/* Instructions */}
        {recipe.instructionGroups.length > 0 && (
          <section className="mb-8">
            <h2 className="section-label">Instructions</h2>
            <div>
              {instructionGroupsWithStart.map(({ group, start }, i) => (
                <InstructionSection key={i} group={group} startIndex={start} />
              ))}
            </div>
          </section>
        )}

        {/* If You Feel Like It */}
        {recipe.ifYouFeelLikeIt && recipe.ifYouFeelLikeIt.length > 0 && (
          <section className="mb-8">
            <IfYouFeelLikeIt items={recipe.ifYouFeelLikeIt} />
          </section>
        )}

        {/* Storage */}
        {recipe.storage && (
          <section className="mb-8">
            <h2 className="section-label">Storage</h2>
            <p className="text-[15px] text-stone-700 leading-relaxed">
              {recipe.storage}
            </p>
          </section>
        )}

        {/* Batch version */}
        {recipe.batchVersion && (
          <section className="mb-8 p-4 bg-stone-100 rounded-xl">
            <h2 className="section-label">Batch Version</h2>
            <p className="text-[15px] text-stone-700 leading-relaxed">
              {recipe.batchVersion}
            </p>
          </section>
        )}

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {recipe.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-stone-100 text-stone-400 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function TimeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm">
      <span className="text-stone-400 text-xs uppercase tracking-wide">{label}</span>
      <p className="text-stone-700 font-medium">{value}</p>
    </div>
  )
}
