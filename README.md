# Food: The Other Love Language

*Recipes for Intention, Care, and Showing Up*

> "Love isn't grand gestures. It's attention, repetition, and presence."

## What this is

A cookbook — and eventually a companion app — built around food as a love
language: chosen family, intention, care, nostalgia, and accessibility for
ADHD cooks. This repo is the single source of truth. The cookbook, the app,
and any future website all pull from the same recipe data and vision docs
living here.

Collaboration with Benny is organic, with no predefined roles.

## Repo structure

```
food-the-other-love-language/
├── README.md                 ← you are here
├── docs/
│   ├── vision.md              ← philosophy, core values, tone
│   └── recipe-standards.md    ← the recipe template + ADHD design rules
├── data/
│   └── recipes/               ← one JSON file per recipe (the real data model)
│       └── recipe.schema.json ← shape every recipe file follows
└── app/
    ├── vision.md               ← what the companion app is (and isn't)
    ├── features.md             ← MVP feature list vs. backlog
    └── data-model.md           ← how docs/recipe data maps into app entities
```

## Status

This is v0.1 of the lean scaffold — enough structure and real content for
Claude Code to build the first working version of the app against. Sprawling
stuff from earlier brainstorming (hosting essays, flavor theory, publishing
roadmap, Kickstarter planning, etc.) is intentionally **not** in here yet —
it's backlog, not blockers. Add it back in as its own doc when it's actually
needed.

## Anchor recipes (currently structured)

- Burnt Butter Hazelnut Cookies (most complete — has full technique notes)
- Cuban Sandwich *(placeholder — needs ingredients/steps)*
- Mom's Chow-Chow *(placeholder)*
- Green Beans *(placeholder)*
- Collards *(placeholder)*
- Sweet Potato Soufflé *(placeholder — lives in Sides)*
- Benny's Holiday Tea *(placeholder — needs tea blend components + regional sub notes)*

## Recipe backlog

See `docs/vision.md` for the full backlog list carried over from the original
Project Bible v0.1 draft (Döner, Shakshuka, Chicken Adobo, Ube Ice Cream, and
~50 more).
