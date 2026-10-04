import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRecipeById } from '../data/recipes'
import { IngredientSection } from '../components/IngredientSection'
import { InstructionSection } from '../components/InstructionSection'
import { IfYouFeelLikeIt } from '../components/IfYouFeelLikeIt'
import { ServingScaler } from '../components/ServingScaler'
import { FavoriteButton } from '../components/FavoriteButton'
import { useFavorites } from '../hooks/useFavorites'

/** Cook mode keeps the screen awake while it's on. */
function useWakeLock(active: boolean) {
  const lock = useRef<WakeLockSentinel | null>(null)
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return
    let cancelled = false
    const request = () =>
      navigator.wakeLock
        .request('screen')
        .then(l => {
          if (cancelled) l.release()
          else lock.current = l
        })
        .catch(() => {})
    request()
    // The lock drops when the tab is hidden; take it back when the cook returns.
    const onVisible = () => document.visibilityState === 'visible' && request()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
      lock.current?.release().catch(() => {})
      lock.current = null
    }
  }, [active])
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="label text-aubergine-soft">{label}</div>
      <div className="qty text-lg mt-1.5">{value}</div>
    </div>
  )
}

export function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const recipe = id ? getRecipeById(id) : undefined
  const [scale, setScale] = useState(1)
  const [cookMode, setCookMode] = useState(false)
  const { isFavorite, toggle } = useFavorites()
  useWakeLock(cookMode)

  if (!recipe) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-[32px]">We couldn’t find that recipe.</h1>
        <Link to="/contents" className="btn-fig">Back to the contents</Link>
      </main>
    )
  }

  const hasContent = recipe.ingredientGroups.length > 0 || recipe.instructionGroups.length > 0

  let stepCounter = 1
  const groupsWithStart = recipe.instructionGroups.map(group => {
    const start = stepCounter
    stepCounter += group.steps.length
    return { group, start }
  })

  return (
    <main className="flex-1">
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-10 flex flex-col gap-5">
        <div className="no-print flex flex-wrap gap-2">
          <Link to="/contents" className="pill-tag bg-blush text-fig-deep hover:bg-blush-border">{recipe.category}</Link>
          {recipe.subcategory && <span className="pill-tag bg-blush text-fig-deep">{recipe.subcategory}</span>}
          {recipe.status === 'anchor' && <span className="pill-tag bg-blush text-fig-deep">Anchor recipe</span>}
        </div>
        <h1 className="font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-none max-w-[900px]">{recipe.title}</h1>
        {recipe.story && (
          <p className="font-serif italic text-[22px] leading-snug text-aubergine-soft max-w-[760px]">{recipe.story}</p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-6 mt-3 pt-6 border-t border-blush-border">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {recipe.totalTime && <Stat label="Total" value={recipe.totalTime} />}
            {recipe.prepTime && <Stat label="Hands-on" value={recipe.prepTime} />}
            {recipe.cookTime && <Stat label="Cook" value={recipe.cookTime} />}
            {recipe.servings && <Stat label="Makes" value={recipe.servings} />}
          </div>
          {hasContent && (
            <div className="no-print flex flex-wrap gap-2.5">
              <a href="#method" className="btn-fig">Jump to recipe</a>
              <button
                type="button"
                aria-pressed={cookMode}
                onClick={() => setCookMode(c => !c)}
                className={cookMode ? 'btn bg-aubergine text-paper' : 'btn-outline'}
              >
                {cookMode ? 'Cook mode on' : 'Cook mode'}
              </button>
              <button type="button" onClick={() => window.print()} className="btn-outline">Print card</button>
              <FavoriteButton isFavorite={isFavorite(recipe.id)} onToggle={() => toggle(recipe.id)} />
            </div>
          )}
        </div>
      </section>

      {!hasContent ? (
        <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pb-24">
          <div className="rounded-card bg-blush border border-blush-border px-6 py-16 text-center">
            <p className="font-display text-[28px]">Coming soon.</p>
            <p className="text-lg mt-3 text-aubergine-soft">We’re still testing this one. It’ll be here when it’s right.</p>
          </div>
        </section>
      ) : (
        <section
          id="method"
          className="print-stack scroll-mt-6 max-w-[1200px] mx-auto px-4 sm:px-8 pb-24 flex flex-wrap items-start gap-12"
        >
          <aside
            aria-label="Ingredients"
            className="print-plain flex-[1_1_340px] min-w-0 bg-blush border border-blush-border rounded-card p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b-2 border-aubergine">
              <h2 className="font-display text-[28px]">Ingredients</h2>
              <ServingScaler scale={scale} onChange={setScale} />
            </div>
            {recipe.ingredientGroups.map((group, i) => (
              <IngredientSection key={i} group={group} scale={scale} />
            ))}
            {scale !== 1 && (
              <p className="no-print mt-5 text-[15px] italic text-aubergine-soft">
                Amounts in the method are for one batch.
              </p>
            )}
          </aside>

          <div className="flex-[999_1_560px] min-w-0">
            <h2 className="font-display text-[28px] pb-5 border-b-2 border-aubergine">Method</h2>
            {groupsWithStart.map(({ group, start }, i) => (
              <InstructionSection key={i} group={group} startIndex={start} large={cookMode} />
            ))}

            {(recipe.ifYouFeelLikeIt?.length || recipe.storage || recipe.batchVersion) && (
              <div className="mt-12 flex flex-wrap gap-6">
                {recipe.ifYouFeelLikeIt && <IfYouFeelLikeIt items={recipe.ifYouFeelLikeIt} />}
                {recipe.storage && (
                  <section className="flex-1 min-w-[min(100%,300px)] rounded-card border border-blush-border p-7">
                    <h2 className="font-display text-2xl mb-3.5">Storage</h2>
                    <p className="text-[17px] leading-relaxed">{recipe.storage}</p>
                  </section>
                )}
                {recipe.batchVersion && (
                  <section className="flex-1 min-w-[min(100%,300px)] rounded-card border border-blush-border p-7">
                    <h2 className="font-display text-2xl mb-3.5">Batch Version</h2>
                    <p className="text-[17px] leading-relaxed">{recipe.batchVersion}</p>
                  </section>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
