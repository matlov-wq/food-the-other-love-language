export function AboutPage() {
  return (
    <main className="flex-1">
      <section className="max-w-[880px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-24 flex flex-col gap-6">
        <p className="label text-fig-deep">About</p>
        <h1 className="font-display text-[clamp(2.4rem,5vw,3.5rem)] leading-none">Care deliberately.</h1>
        <p className="text-lg leading-[1.6] max-w-[640px]">
          Food is one of the most tangible ways we care for one another. Cooking is an act of attention.
          The philosophy here isn’t “eat perfectly” — it’s “care deliberately.”
        </p>
        <p className="text-lg leading-[1.6] max-w-[640px]">
          Food is how we say: I thought about you. I took the time. You matter. And sometimes, that person is you.
        </p>
        <div className="rounded-card bg-blush border border-blush-border p-7 sm:p-8 max-w-[640px] flex flex-col gap-3">
          <p className="label text-fig-deep">How the recipes work</p>
          <p className="text-lg leading-[1.6]">
            Every recipe is written to be easy to follow mid-cook: ingredients grouped by the step that uses them,
            amounts repeated right where you need them, and a “done when” cue so you’re watching the food, not just the clock.
          </p>
        </div>
        <p className="font-serif italic text-xl text-aubergine-soft">— Mat &amp; Benny</p>
      </section>
    </main>
  )
}
