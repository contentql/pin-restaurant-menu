import configPromise from '@payload-config'
import { Category } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { categoriesData } from './data'

const payload = await getPayload({ config: configPromise })

export const seedCategories = async ({ spinner }: { spinner: Ora }) => {
  const categoryList: Category[] = []

  spinner.start('Started creating categories...')
  for await (const details of categoriesData) {
    try {
      const tag = await payload.create({
        collection: 'categories',
        data: {
          ...details,
          meta: {
            title: details.name,
            description: details.description,
          },
        },
        overrideAccess: true,
      })

      categoryList.push(tag)
    } catch (error) {
      spinner.fail(`Failed creating categories...`)
      throw error
    }
  }

  spinner.succeed('Successfully created categories...')
  return categoryList
}
