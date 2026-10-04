import { useState } from 'react'
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

/** Subsections within a course (e.g. Buns under Breakfast), in alphabetical order. */
function subcategories(items: Recipe[]): string[] {
  return [...new Set(items.map(r => r.subcategory).filter((s): s is string => !!s))].sort()
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function countLabel(n: number) {
  return `${n} ${n === 1 ? 'recipe' : 'recipes'}`
}

interface OpenState {
  isOpen: (key: string) => boolean
  toggle: (key: string) => void
}

function Course({ n, title, items, isSaved, open }: { n: number; title: string; items: Recipe[]; isSaved: (id: string) => boolean; open: OpenState }) {
  const key = `c:${title}`
  const expanded = open.isOpen(key)
  const panelId = `course-panel-${n}`
  return (
    <section>
      <h3>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => open.toggle(key)}
          className="w-full flex items-baseline gap-4 pb-3 border-b-2 border-aubergine text-left group"
        >
          <span className="qty text-[15px] text-fig-deep">{String(n).padStart(2, '0')}</span>
          <span className="font-display text-[28px] leading-tight flex-1 group-hover:text-fig transition-colors">{title}</span>
          <span className="qty font-medium text-[15px] text-aubergine-soft">{countLabel(items.length)}</span>
          <span className="self-center text-aubergine group-hover:text-fig"><Chevron open={expanded} /></span>
        </button>
      </h3>
      <div id={panelId} hidden={!expanded}>
        {items.filter(r => !r.subcategory).map(r => (
          <ContentsRow key={r.id} recipe={r} saved={isSaved(r.id)} />
        ))}
        {subcategories(items).map((sub, i) => {
          const subKey = `s:${title}:${sub}`
          const subOpen = open.isOpen(subKey)
          const subPanel = `${panelId}-sub-${i}`
          const subItems = items.filter(r => r.subcategory === sub)
          return (
            <div key={sub}>
              <h4>
                <button
                  type="button"
                  aria-expanded={subOpen}
                  aria-controls={subPanel}
                  onClick={() => open.toggle(subKey)}
                  className="w-full flex items-center gap-3 min-h-[56px] py-3 border-b border-blush-border text-left group"
                >
                  <span className="label text-fig-deep flex-1 group-hover:text-fig">{sub}</span>
                  <span className="qty font-medium text-[13px] text-aubergine-soft">{countLabel(subItems.length)}</span>
                  <span className="text-fig-deep"><Chevron open={subOpen} /></span>
                </button>
              </h4>
              <div id={subPanel} hidden={!subOpen} className="pl-4 sm:pl-6 border-l-2 border-blush">
                {subItems.map(r => (
                  <ContentsRow key={r.id} recipe={r} saved={isSaved(r.id)} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const OPEN_KEY = 'ftoll:contents-open'

/** Which courses/subsections are expanded. Kept for the session so coming back from a recipe keeps your place. */
function useOpenSections(allKeys: string[]) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => {
    try {
      const raw = sessionStorage.getItem(OPEN_KEY)
      return new Set(raw ? (JSON.parse(raw) as string[]) : [])
    } catch {
      return new Set()
    }
  })
  const save = (next: Set<string>) => {
    setOpenKeys(next)
    try {
      sessionStorage.setItem(OPEN_KEY, JSON.stringify([...next]))
    } catch {
      /* private mode: just don't remember */
    }
  }
  const state: OpenState = {
    isOpen: key => openKeys.has(key),
    toggle: key => {
      const next = new Set(openKeys)
      next.has(key) ? next.delete(key) : next.add(key)
      save(next)
    },
  }
  const allOpen = allKeys.every(k => openKeys.has(k))
  const setAll = (open: boolean) => save(open ? new Set(allKeys) : new Set())
  return { state, allOpen, setAll }
}

export function HomePage() {
  const { favorites, isFavorite } = useFavorites()
  const courses = CATEGORIES.map(c => ({ title: c, items: recipes.filter(r => r.category === c) }))
    .filter(c => c.items.length > 0)
  const saved = recipes.filter(r => favorites.has(r.id))
  const allKeys = [
    ...(saved.length ? ['saved'] : []),
    ...courses.flatMap(c => [`c:${c.title}`, ...subcategories(c.items).map(s => `s:${c.title}:${s}`)]),
  ]
  const { state: open, allOpen, setAll } = useOpenSections(allKeys)

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
          <button type="button" onClick={() => setAll(!allOpen)} className="label text-fig hover:text-fig-deep min-h-[44px] px-1">
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        <div className="flex flex-col gap-10">
          {saved.length > 0 && (
            <section>
              <h3>
                <button
                  type="button"
                  aria-expanded={open.isOpen('saved')}
                  aria-controls="saved-panel"
                  onClick={() => open.toggle('saved')}
                  className="w-full flex items-baseline gap-4 pb-3 border-b-2 border-aubergine text-left group"
                >
                  <span className="text-fig self-center"><HeartIcon /></span>
                  <span className="font-display text-[28px] leading-tight flex-1 group-hover:text-fig transition-colors">Saved</span>
                  <span className="qty font-medium text-[15px] text-aubergine-soft">{countLabel(saved.length)}</span>
                  <span className="self-center text-aubergine group-hover:text-fig"><Chevron open={open.isOpen('saved')} /></span>
                </button>
              </h3>
              <div id="saved-panel" hidden={!open.isOpen('saved')}>
                {saved.map(r => (
                  <ContentsRow key={r.id} recipe={r} saved={false} />
                ))}
              </div>
            </section>
          )}
          {courses.map((c, i) => (
            <Course key={c.title} n={i + 1} title={c.title} items={c.items} isSaved={isFavorite} open={open} />
          ))}
        </div>
      </div>
    </main>
  )
}
