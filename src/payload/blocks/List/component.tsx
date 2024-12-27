import { Params } from '../types'
import { ListType } from '@payload-types'
import { getPayload } from 'payload'
import configPromise from 'payload.config'

import FoodItems from './components/FoodItems'

interface ListProps extends ListType {
  params: Params
}

const List: React.FC<ListProps> = async ({ params, ...block }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs = [] } = await payload.find({
    collection: 'foodItems',
    limit: 1000,
    draft: false,
  })

  const { docs: categories = [] } = await payload.find({
    collection: 'categories',
    limit: 1000,
    draft: false,
  })

  return <FoodItems foodItems={docs} categories={categories} />
}

export default List
