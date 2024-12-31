import { Form } from '@payload-types'
import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

// For forms if fields are updated we need to revalidate the pages using that form
export const revalidateForm: CollectionAfterChangeHook<Form> = async ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  // Finding all the pages by selecting path & layout fields
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 10000,
    select: {
      layout: true,
      path: true,
    },
    depth: 10,
  })

  if (docs.length) {
    docs.forEach(({ layout, path }) => {
      if (layout) {
        const hasForm = layout.find(block => {
          if (block.blockType === 'FormBlock') {
            const form =
              typeof block.form.value === 'object'
                ? block.form.value
                : undefined

            // checking if doc.title is equal to page form title
            if (form) {
              return form.title === doc.title
            }
          }
        })

        // revalidating that particular page
        if (hasForm) {
          revalidatePath(`${path}`)
        }
      }
    })
  }
}
