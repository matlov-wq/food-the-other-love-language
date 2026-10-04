import type { Recipe, Category } from '../types/recipe'

const modules = import.meta.glob('../../../data/recipes/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Recipe>

export const recipes: Recipe[] = Object.entries(modules)
  .filter(([path]) => !path.includes('recipe.schema'))
  .map(([, recipe]) => recipe)
  .sort((a, b) => a.title.localeCompare(b.title))

export const CATEGORIES: Category[] = [
  'Breakfast',
  'Starters',
  'Sides',
  'Breads',
  'Sauces & Condiments',
  'Entrees',
  'Desserts',
  'Party Snacks',
  'Non-Alcoholic Beverages',
  'Mocktails',
  'Boozy Drinks',
]

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id)
}

export function getRecipesByCategory(category: Category): Recipe[] {
  return recipes.filter(r => r.category === category)
}
