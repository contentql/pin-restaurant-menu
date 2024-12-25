import { Block } from 'payload'

const ListConfig: Block = {
  slug: 'List',
  interfaceName: 'ListType',
  fields: [
    {
      type: 'select',
      name: 'collectionSlug',
      label: 'Collection Slug',
      required: true,
      options: [
        {
          label: 'Food Items',
          value: 'foodItems',
        },
      ],
    },
  ],
}

export default ListConfig
