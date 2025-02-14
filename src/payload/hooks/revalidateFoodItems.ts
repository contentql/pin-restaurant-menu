import { FoodItem } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'
import { CollectionAfterDeleteHook } from 'payload'

export const revalidateFoodItemsAfterChange: CollectionAfterChangeHook<
  FoodItem
> = async ({ doc, previousDoc }) => {
  if (
    doc._status === 'published' ||
    (previousDoc._status === 'published' && doc._status === 'draft')
  ) {
    // Revalidating both categories & food items
    revalidateTag('list-food-items')
    revalidateTag('list-categories')
    console.log(`revalidated foodItems & categories at ${new Date().getTime()}`)
  }
}

export const revalidateFoodItemsAfterDelete: CollectionAfterDeleteHook<
  FoodItem
> = async () => {
  // Revalidating both categories & food items
  revalidateTag('list-food-items')
  revalidateTag('list-categories')
  console.log(`revalidated foodItems & categories at ${new Date().getTime()}`)
}
