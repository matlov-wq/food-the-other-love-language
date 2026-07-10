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
      <section
        className="relative flex flex-col min-h-[62dvh]"
        style={{
          background: 'radial-gradient(ellipse at 30% 65%, rgba(184, 121, 58, 0.09) 0%, transparent 58%), #3D2E1F',
        }}
      >
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

        {/* Title block — vertically centered */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-14">
          <h1 className="leading-none mb-6" style={{ color: '#FAF3E7' }}>
            <span
              className="block font-display font-black text-[clamp(4rem,18vw,9rem)]"
              style={{ fontVariationSettings: "'opsz' 144, 'wght' 800" }}
            >
              Food
            </span>
            <span className="block font-serif italic text-[clamp(1.1rem,4.5vw,2.2rem)] -mt-2" style={{ color: '#E8C888' }}>
              The Other Love Language
            </span>
          </h1>
          <p className="font-serif italic text-base max-w-[17rem] leading-relaxed" style={{ color: '#E8C888' }}>
            Some people write cards, we cook.
          </p>
          <p className="mt-4 text-[10px] tracking-[0.2em] uppercase" style={{ color: '#A88860' }}>
            six recipes, new every other month
          </p>
        </div>

        {/* Season selector pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div
            className="flex items-center gap-2 rounded-full cursor-pointer transition-opacity hover:opacity-75"
            style={{
              color: '#E8C888',
              border: '1px solid #8B5A2B',
              padding: '10px 20px',
            }}
          >
            <span className="text-xs tracking-widest uppercase whitespace-nowrap">{theme.subtitle}</span>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Current Theme ─────────────────────────────────────── */}
      <section className="px-6 py-14" style={{ backgroundColor: '#FAF3E7' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#B8793A' }}>
            {theme.subtitle}
          </p>
          <h2
            className="font-display font-bold text-4xl leading-tight mb-5"
            style={{ color: '#3D2817', fontVariationSettings: "'opsz' 72, 'wght' 700" }}
          >
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
            <p className="font-display font-semibold text-lg" style={{ color: '#3D2817', fontVariationSettings: "'opsz' 36, 'wght' 600" }}>
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
