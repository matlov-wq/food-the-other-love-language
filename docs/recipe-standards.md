# Recipe Standards

This is the authoritative format every recipe (and every recipe in
`data/recipes/*.json`) should follow. It's also the spec for how the app
should render a recipe.

## ADHD design principles

- **Ingredients divided by prep section.** If a recipe has a dough and a
  filling, ingredients are grouped under those headers, not dumped in one
  list.
- **State the measurement the first time an ingredient appears** — in both
  the ingredient list *and* the instruction step. Don't make the cook scroll
  back up to remember how much butter.
- **No unnecessary repetition beyond that.** Once an amount's been stated
  where it's used, don't restate it again later in the same step.
- **Sequential actions are split into distinct steps**, not bundled into one
  paragraph of "do this, then this, then this, then this."
- **Visual/doneness cues included** — "edges golden, centers just set," not
  just a time. ADHD cooks (and honestly everyone) benefit from a sensory
  checkpoint, not just a timer.
- **Prep and storage instructions included** on every recipe — make-ahead
  notes, fridge/freezer life, reheating.
- **"If You Feel Like It"** — the label for optional additions or variations.
  Never "optional," never "tip." Keeps a consistent, warm voice.

## Recipe template (matches `recipe.schema.json`)

```
Title
Story / headnote        — a few sentences: why this recipe, who it's for
Category                — Starters | Sides | Sauces & Condiments | Entrees |
                           Desserts | Party Snacks | Non-Alcoholic Beverages |
                           Mocktails | Boozy Drinks
Servings / yield
Prep time / cook time / total time
Ingredients              — grouped by section
Instructions              — grouped by section, matching ingredient groups
If You Feel Like It       — optional variations/additions
Storage                   — fridge/freezer, how long, how to reheat
Batch version              — if applicable (mainly drinks)
```

## Status field

Every recipe file carries a `status`:

- `anchor` — a defining recipe for the book (see README)
- `draft` — in progress, has real content but incomplete
- `backlog` — idea only, no content yet
