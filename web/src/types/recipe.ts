export interface IngredientItem {
  id: string
  text: string
}

export interface IngredientGroup {
  section: string
  items: IngredientItem[]
}

export interface Step {
  text: string
  donenessCue?: string
  timerMinutes?: number
}

export interface InstructionGroup {
  section: string
  steps: Step[]
}

export type RecipeStatus = 'anchor' | 'draft' | 'backlog'

export type Category =
  | 'Breakfast'
  | 'Starters'
  | 'Sides'
  | 'Breads'
  | 'Sauces & Condiments'
  | 'Entrees'
  | 'Desserts'
  | 'Party Snacks'
  | 'Non-Alcoholic Beverages'
  | 'Mocktails'
  | 'Boozy Drinks'

export interface Recipe {
  id: string
  title: string
  story?: string
  category: Category
  /** Optional family within a category, e.g. 'Buns' or 'Mac and Cheese' */
  subcategory?: string
  status: RecipeStatus
  servings?: string
  prepTime?: string
  cookTime?: string
  totalTime?: string
  ingredientGroups: IngredientGroup[]
  instructionGroups: InstructionGroup[]
  ifYouFeelLikeIt?: string[]
  storage?: string
  batchVersion?: string
  tags?: string[]
}
