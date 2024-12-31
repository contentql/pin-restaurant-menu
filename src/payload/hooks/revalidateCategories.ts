import { Category } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateCategories: CollectionAfterChangeHook<
  Category
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
