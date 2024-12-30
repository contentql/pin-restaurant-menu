import { Page } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePages: CollectionAfterChangeHook<Page> = async ({
  doc,
  req: { payload },
}) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag(`page-${doc?.path}`)
    console.log(`revalidated page-${doc?.path} at ${new Date().getTime()}`)
  }
}
