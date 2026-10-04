import { Link } from 'react-router-dom'
import { recipes, CATEGORIES } from '../data/recipes'
import { useFavorites } from '../hooks/useFavorites'
import { shortTime } from '../lib/format'
import type { Recipe } from '../types/recipe'

function HeartIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function ContentsRow({ recipe, saved }: { recipe: Recipe; saved: boolean }) {
  const comingSoon = recipe.ingredientGroups.length === 0 && recipe.instructionGroups.length === 0
  const time = shortTime(recipe.totalTime)
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group flex flex-wrap items-center gap-x-4 gap-y-2 py-[18px] border-b border-blush-border"
    >
      <span className="flex-1 min-w-[12rem] text-[22px] leading-snug group-hover:text-fig transition-colors">
        {recipe.title}
      </span>
      {saved && (
        <span className="text-fig" aria-label="Saved">
          <HeartIcon />
        </span>
      )}
      {comingSoon && <span className="pill-tag bg-blush text-fig-deep">Coming soon</span>}
      <span className="qty font-medium text-[15px] text-aubergine-soft">{time || '—'}</span>
    </Link>
  )
}

function Course({ n, title, items, isSaved }: { n: number; title: string; items: Recipe[]; isSaved: (id: string) => boolean }) {
  const headingId = `course-${n}`
  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-baseline gap-4 pb-3 border-b-2 border-aubergine">
        <span className="qty text-[15px] text-fig-deep">{String(n).padStart(2, '0')}</span>
        <h3 id={headingId} className="font-display text-[28px] leading-tight">{title}</h3>
      </div>
      {items.map(r => (
        <ContentsRow key={r.id} recipe={r} saved={isSaved(r.id)} />
      ))}
    </section>
  )
}

export function HomePage() {
  const { favorites, isFavorite } = useFavorites()
  const courses = CATEGORIES.map(c => ({ title: c, items: recipes.filter(r => r.category === c) }))
    .filter(c => c.items.length > 0)
  const saved = recipes.filter(r => favorites.has(r.id))

  return (
    <main className="flex-1">
      <section className="max-w-[880px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-12 sm:pb-14">
        <p className="label text-aubergine-soft">A cookbook &amp; kitchen vlog by Mat &amp; Benny</p>
        <h1 className="font-display text-[clamp(2.6rem,6vw,4rem)] leading-none tracking-[-0.01em] mt-5 mb-6">
          Some people write cards, we cook.
        </h1>
        <p className="font-serif italic text-2xl leading-snug text-aubergine-soft max-w-[640px]">
          Food is how we say: I thought about you. I took the time. You matter.
        </p>
      </section>

      <div className="max-w-[880px] mx-auto px-4 sm:px-8 pb-24">
        <div className="flex items-baseline justify-between gap-4 mb-10">
          <h2 className="font-display text-[32px] leading-tight">Contents</h2>
          <span className="label text-aubergine-soft">Total time</span>
        </div>

        <div className="flex flex-col gap-14">
          {saved.length > 0 && (
            <section aria-labelledby="saved">
              <div className="flex items-baseline gap-4 pb-3 border-b-2 border-aubergine">
                <span className="text-fig"><HeartIcon /></span>
                <h3 id="saved" className="font-display text-[28px] leading-tight">Saved</h3>
              </div>
              {saved.map(r => (
                <ContentsRow key={r.id} recipe={r} saved={false} />
              ))}
            </section>
          )}
          {courses.map((c, i) => (
            <Course key={c.title} n={i + 1} title={c.title} items={c.items} isSaved={isFavorite} />
          ))}
        </div>
      </div>
    </main>
  )
}
