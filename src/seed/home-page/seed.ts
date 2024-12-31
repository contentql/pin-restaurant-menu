import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const seedHomePage = async ({ spinner }: { spinner: Ora }) => {
  spinner.start(`Started creating home-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home Page',
        isHome: true,
        _status: 'published',
        slug: 'home-page',
        layout: [
          {
            blockType: 'List',
            collectionSlug: 'foodItems',
            blockName: 'food-items-block',
          },
        ],
      },
    })

    spinner.succeed(`Successfully created home-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating home-page...`)
    throw error
  }
}
