import { z } from 'zod'

export const FoodItemsSchema = z.object({
  search: z.string().optional().default(''),
  type: z.enum(['veg', 'nonVeg']).optional(),
  categories: z.string().array().optional().default([]),
  special: z.boolean().optional(),
})
