# Companion App — Vision

Not "a cookbook app." A kitchen companion that happens to launch with this
book's recipes as its content.

The recipes are the wedge, not the whole product: most recipe apps don't do
grouped ingredients, inline repeated measurements, or doneness cues well.
That's the actual differentiator, and it's already defined in
`../docs/recipe-standards.md` — the app should implement that spec exactly,
not a generic recipe-card layout.

## What it is (MVP)

- Browse recipes by category
- Recipe detail view that renders the ADHD-friendly format: grouped
  ingredients, inline measurements repeated in steps, doneness cues, "If You
  Feel Like It" notes clearly set apart
- Scale servings up/down
- Save favorites

## What it explicitly is NOT yet (backlog, not MVP)

Pantry inventory, "what can I cook with...", shopping list generation,
holiday meal planner, timeline mode, batch calculator, offline support,
photo journal, collaborative/shared cookbooks, voice cooking, Apple Watch
support. All good ideas. None of them block a first working version.

## Why scope it down

The earlier ChatGPT brainstorm sketched ~20 feature areas as if they were
all v1. Building toward all of them at once means nothing ships. Better to
get grouped-ingredients + doneness-cues + scaling right for a handful of
real recipes, then layer on.
