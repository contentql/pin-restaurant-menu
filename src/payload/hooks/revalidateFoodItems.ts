import { FoodItem } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePages: CollectionAfterChangeHook<
  FoodItem
> = async ({}) => {
  // Revalidating both categories & food items
  revalidateTag('list-food-items')
  revalidateTag('list-categories')
  console.log(`revalidated foodItems} at ${new Date().getTime()}`)
}
