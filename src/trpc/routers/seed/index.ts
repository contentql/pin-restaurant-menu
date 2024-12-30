import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import ora from 'ora'
import { getPayload } from 'payload'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })

export const seedRouter = router({
  runSeed: publicProcedure.mutation(async () => {
    const spinner = ora({
      text: 'Starting the seeding process...',
      color: 'cyan',
      spinner: 'dots',
    }).start()

    try {
      const pages = await payload.count({
        collection: 'pages',
      })

      // checking if pages are created skipping the seeding process
      if (pages.totalDocs >= 1) {
        return
      }

      return { success: true }
    } catch (error: any) {
      console.error('Error seeding:', error)

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})
