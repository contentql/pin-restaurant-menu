import configPromise from '@payload-config'
import { Category, Media } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { foodItemsData } from './data'

const payload = await getPayload({ config: configPromise })

export const seedFoodItems = async ({
  spinner,
  categories,
}: {
  spinner: Ora
  categories: Category[]
}) => {
  spinner.start(`Started creating food-items...`)

  try {
    for await (const foodItem of foodItemsData) {
      const {
        category,
        description,
        imageURL: imageList,
        name,
        price,
        special,
        type,
      } = foodItem

      //   Uploading images and storing them in uploadedImageList
      const uploadedImageList: Media[] = []

      for await (const image of imageList) {
        const { alt, url } = image
        const imageResponse = await payload.create({
          collection: 'media',
          data: {
            alt,
          },
          filePath: url,
        })

        uploadedImageList.push(imageResponse)
      }

      //   Filtering the categories
      const filteredCategories = category
        .map(categorySlug => {
          const sameTag = categories.find(({ slug }) => slug === categorySlug)

          if (sameTag) {
            return sameTag.id
          }
        })
        .filter((category): category is number => !!category)

      await payload.create({
        collection: 'foodItems',
        data: {
          description,
          categories: filteredCategories,
          name,
          price,
          special,
          type,
          gallery: uploadedImageList,
          _status: 'published',
        },
      })
    }

    spinner.succeed(`Successfully created food-items...`)
  } catch (error) {
    spinner.fail(`Failed creating food-items...`)
    throw error
  }
}
