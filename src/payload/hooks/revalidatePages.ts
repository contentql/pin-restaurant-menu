import { Page } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'
import { CollectionAfterDeleteHook } from 'payload'

export const revalidatePagesAfterChange: CollectionAfterChangeHook<
  Page
> = async ({ doc, req: { payload }, previousDoc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (
    doc._status === 'published' ||
    (previousDoc._status === 'published' && doc._status === 'draft')
  ) {
    revalidateTag(`page-${doc?.path}`)
    console.log(`revalidated page-${doc?.path} at ${new Date().getTime()}`)
  }
}

export const revalidatePagesAfterDelete: CollectionAfterDeleteHook<
  Page
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page

  revalidateTag(`page-${doc?.path}`)
  console.log(`revalidated page-${doc?.path} at ${new Date().getTime()}`)
}
