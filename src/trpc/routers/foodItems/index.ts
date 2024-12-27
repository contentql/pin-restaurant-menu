import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import { getPayload } from 'payload'

import { publicProcedure, router } from '@/trpc'

import { FoodItemsSchema } from './validator'

const payload = await getPayload({
  config: configPromise,
})

export const foodItemsRouter = router({
  getAllItems: publicProcedure
    .input(FoodItemsSchema)
    .query(async ({ input }) => {
      try {
        const { search, type, categories, special } = input

        const categoryIDs: number[] = []

        // If categories are added, finding there id's to query
        if (categories.length) {
          const { docs } = await payload.find({
            collection: 'categories',
            limit: 10000,
            select: {
              slug: true,
            },
            where: {
              or: categories.map(category => ({
                slug: {
                  contains: category,
                },
              })),
            },
          })

          if (docs.length) {
            docs.forEach(({ id }) => categoryIDs.push(id))
          }
        }

        console.log(
          categoryIDs.map(id => ({
            categories: {
              contains: id,
            },
          })),
        )

        const { docs = [] } = await payload.find({
          collection: 'foodItems',
          limit: 10000,
          draft: false,
          where: {
            name: {
              contains: search,
            },
            ...(type
              ? {
                  type: {
                    equals: type,
                  },
                }
              : {}),
            ...(categoryIDs.length
              ? {
                  or: categoryIDs.map(id => ({
                    categories: {
                      contains: id,
                    },
                  })),
                }
              : {}),
            ...(special
              ? {
                  special: {
                    equals: true,
                  },
                }
              : {}),
          },
        })

        return docs
      } catch (error) {
        console.log(error)

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof Error ? error.message : 'Failed to retrieve items',
        })
      }
    }),
})
