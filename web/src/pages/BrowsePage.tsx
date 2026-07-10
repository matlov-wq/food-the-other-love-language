import { useState } from 'react'
import { Link } from 'react-router-dom'
import { recipes } from '../data/recipes'
import type { Category } from '../types/recipe'
import { CategoryNav } from '../components/CategoryNav'
import { RecipeCard } from '../components/RecipeCard'
import { useFavorites } from '../hooks/useFavorites'

export function BrowsePage() {
  const [filter, setFilter] = useState<Category | 'Favorites' | null>(null)
  const { favorites, toggle, isFavorite } = useFavorites()

  const filtered = recipes.filter(r => {
    if (filter === 'Favorites') return favorites.has(r.id)
    if (filter) return r.category === filter
    return true
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF3E7' }}>
      <header className="sticky top-0 z-10 shadow-sm text-white" style={{ backgroundColor: '#3D2817' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="font-serif text-xl font-medium leading-tight group-hover:text-butter-300 transition-colors">
              Food
            </h1>
            <p className="text-stone-400 text-xs tracking-wide">
              The Other Love Language
            </p>
          </Link>
          {favorites.size > 0 && (
            <button
              onClick={() => setFilter(f => (f === 'Favorites' ? null : 'Favorites'))}
              aria-label="Show favorites"
              className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-butter-400 transition-colors"
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill={filter === 'Favorites' ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={filter === 'Favorites' ? 'text-butter-400' : ''}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{favorites.size}</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5">
        <div className="mb-5">
          <CategoryNav
            selected={filter}
            onSelect={setFilter}
            favoriteCount={favorites.size}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-stone-400 py-16 text-sm">
            {filter === 'Favorites' ? 'No favorites yet.' : 'No recipes in this category yet.'}
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={isFavorite(recipe.id)}
                onToggleFavorite={toggle}
              />
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-xs text-stone-300">
          &ldquo;Love isn&rsquo;t grand gestures. It&rsquo;s attention, repetition, and presence.&rdquo;
        </p>
      </main>
    </div>
  )
}
