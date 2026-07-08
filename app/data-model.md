# Data Model

## Source of truth

`data/recipes/*.json`, one file per recipe, validated against
`data/recipes/recipe.schema.json`. The app should read directly from these
files (or a build step that bundles them) rather than maintaining a separate
copy of recipe content.

## Core entities (MVP)

**Recipe** — matches the schema in `data/recipes/recipe.schema.json`
directly. Key fields: `id`, `title`, `category`, `status`,
`ingredientGroups`, `instructionGroups`, `ifYouFeelLikeIt`, `storage`.

**Favorite** — `{ recipeId, savedAt }`. Local storage for MVP, no backend
needed.

## Deferred entities (backlog features, not needed yet)

- User / auth
- Pantry item
- Shopping list / shopping list item
- Menu / Event (holiday planner)
- Collection (curated recipe groupings beyond category)
- Note (personal annotations on a recipe, separate from the recipe's own
  content)

Don't build these tables/types until the feature that needs them is
actually being built — keeps the schema honest.
