import { Params } from '../types'
import { ListType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from 'payload.config'

import FoodItems from './components/FoodItems'

interface ListProps extends ListType {
  params: Params
}

const List: React.FC<ListProps> = async ({ params, ...block }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: foodItems = [] } = await unstable_cache(
    async () =>
      await payload.find({
        collection: 'foodItems',
        depth: 5,
        draft: false,
        limit: 10000,
      }),
    ['list', 'food-items'],
    { tags: ['list-food-items'] },
  )()

  const { docs: categories = [] } = await unstable_cache(
    async () =>
      await payload.find({
        collection: 'categories',
        depth: 5,
        draft: false,
        limit: 10000,
      }),
    ['list', 'categories'],
    { tags: ['list-categories'] },
  )()

  return <FoodItems foodItems={foodItems} categories={categories} />
}

export default List
