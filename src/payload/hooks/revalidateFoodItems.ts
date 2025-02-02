import { FoodItem } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateFoodItems: CollectionAfterChangeHook<FoodItem> = async ({
  doc,
  previousDoc,
}) => {
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
