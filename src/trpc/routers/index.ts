import { router } from '@/trpc'
import { pageRouter } from '@/trpc/routers/page'
import { siteSettingsRouter } from '@/trpc/routers/site-settings'

import { authRouter } from './auth'
import { foodItemsRouter } from './foodItems'
import { formRouter } from './form'
import { seedRouter } from './seed'
import { userRouter } from './user/user-route'

export const appRouter = router({
  auth: authRouter,
  page: pageRouter,

  siteSettings: siteSettingsRouter,

  user: userRouter,
  seed: seedRouter,
  // this is used for global search

  form: formRouter,
  foodItems: foodItemsRouter,
})

export type AppRouter = typeof appRouter
