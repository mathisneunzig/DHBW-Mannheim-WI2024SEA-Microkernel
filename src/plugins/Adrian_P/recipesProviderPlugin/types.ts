export type Ingredient = {
    name: string
    qty: number
    unit?: string };

export type Recipe = {
    id: string
    title: string
    servings: number
    ingredients: Ingredient[]
    description?: string
};