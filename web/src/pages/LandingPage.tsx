import { Link } from 'react-router-dom'
import { getCurrentTheme, getNextTheme } from '../data/themes'
import { recipes } from '../data/recipes'
import { FeaturedRecipeCard } from '../components/FeaturedRecipeCard'

export function LandingPage() {
  const theme = getCurrentTheme()
  const nextTheme = getNextTheme()

  const featuredRecipes = theme.featuredRecipeIds
    .map(id => recipes.find(r => r.id === id))
    .filter(Boolean) as typeof recipes

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92dvh] flex flex-col" style={{ backgroundColor: '#3D2817' }}>
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 pt-8 pb-4">
          <span className="font-serif text-sm tracking-wide" style={{ color: '#E8C888' }}>
            Food: The Other Love Language
          </span>
          <Link
            to="/recipes"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: '#8B5A2B' }}
          >
            All Recipes
          </Link>
        </nav>

        {/* Title block */}
        <div className="flex-1 flex flex-col justify-end px-6 pb-20">
          <h1 className="font-serif leading-none mb-6" style={{ color: '#FAF3E7' }}>
            <span className="block text-[clamp(4rem,18vw,9rem)] font-medium">
              Food
            </span>
            <span className="block text-[clamp(1.1rem,4.5vw,2.2rem)] italic -mt-2" style={{ color: '#E8C888' }}>
              The Other Love Language
            </span>
          </h1>
          <p className="font-serif italic text-base max-w-xs leading-relaxed" style={{ color: '#8B5A2B' }}>
            &ldquo;Love isn&rsquo;t grand gestures. It&rsquo;s attention,
            repetition, and presence.&rdquo;
          </p>
        </div>

        {/* Scroll nudge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ color: '#6B4226' }}>
          <span className="text-xs tracking-widest uppercase">
            {theme.subtitle}
          </span>
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Current Theme ─────────────────────────────────────── */}
      <section className="px-6 py-14" style={{ backgroundColor: '#FAF3E7' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#B8793A' }}>
            {theme.subtitle}
          </p>
          <h2 className="font-serif text-4xl leading-tight mb-5" style={{ color: '#3D2817' }}>
            {theme.title}
          </h2>
          <p className="text-base leading-relaxed max-w-lg" style={{ color: '#6B4226' }}>
            {theme.description}
          </p>

          {/* Featured recipes */}
          {featuredRecipes.length > 0 && (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5A2B' }}>
                Featured this season
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                {featuredRecipes.map(recipe => (
                  <FeaturedRecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}

          {featuredRecipes.length === 0 && (
            <p className="mt-8 text-sm italic" style={{ color: '#B8793A' }}>
              Recipes for this theme are coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ── Coming Up ─────────────────────────────────────────── */}
      <section className="px-6 py-10 border-t" style={{ backgroundColor: '#F3E4C8', borderColor: '#E8C888' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#8B5A2B' }}>
              Coming up
            </p>
            <p className="font-serif text-lg" style={{ color: '#3D2817' }}>
              {nextTheme.title}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#B8793A' }}>{nextTheme.subtitle}</p>
          </div>
          <div className="flex-shrink-0 w-px h-10" style={{ backgroundColor: '#E8C888' }} />
          <Link
            to="/recipes"
            className="flex-shrink-0 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: '#6B4226' }}
          >
            Browse all recipes →
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="px-6 py-8 text-center" style={{ backgroundColor: '#3D2817' }}>
        <p className="font-serif italic text-sm" style={{ color: '#6B4226' }}>
          Recipes for intention, care, and showing up.
        </p>
      </footer>
    </div>
  )
}
