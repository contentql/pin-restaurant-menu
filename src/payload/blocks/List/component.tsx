'use client'

import { Search, ShoppingCart } from 'lucide-react'
import React from 'react'

import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { useFiltersContext } from '@/utils/filtersContext'

import FilterDrawer from './components/FilterDrawer'
import FoodCard from './components/FoodCard'

const List: React.FC = ({ params, ...block }: any) => {
  const { search, setSearch } = useFiltersContext()

  return (
    <section>
      <div className='relative flex items-center gap-2'>
        <Input
          placeholder='Search'
          className='pl-9'
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
        <Search size={24} className='absolute left-2 top-2' />

        <FilterDrawer />
      </div>

      <FoodCard />

      <Button className='fixed bottom-4 left-4 px-2.5'>
        <ShoppingCart size={20} />
      </Button>
    </section>
  )

  // switch (block?.collectionSlug) {
  //   case 'blogs': {
  //     const { docs: blogs = [] } = await unstable_cache(
  //       async () =>
  //         await payload.find({
  //           collection: 'blogs',
  //           depth: 5,
  //           draft: false,
  //           limit: 1000,
  //         }),
  //       ['list', 'blogs'],
  //       { tags: ['list-blogs'] },
  //     )()

  //     return <BlogsList blogs={blogs} title={block['title']} />
  //   }

  //   case 'tags': {
  //     const { docs: tags = [] } = await unstable_cache(
  //       async () =>
  //         await payload.find({
  //           collection: 'tags',
  //           depth: 5,
  //           draft: false,
  //           limit: 1000,
  //         }),
  //       ['list', 'tags'],
  //       { tags: ['list-tags'] },
  //     )()

  //     const { docs: blogs } = await unstable_cache(
  //       async () =>
  //         await payload.find({
  //           collection: 'blogs',
  //           limit: 1000,
  //           select: {
  //             tags: true,
  //           },
  //           populate: {
  //             tags: {
  //               slug: true,
  //             },
  //           },
  //         }),
  //       ['list', 'tags', 'with-blog-count'],
  //       { tags: ['list-tags-with-blog-count'] },
  //     )()

  //     const tagsWithCount = tags.map(tag => {
  //       const count = blogs.filter(blog => {
  //         const blogTags = blog.tags

  //         if (blogTags) {
  //           return blogTags.find(({ value }) => {
  //             if (typeof value === 'number') {
  //               return value === tag.id
  //             } else {
  //               return value.id === tag.id
  //             }
  //           })
  //         }
  //       }).length

  //       return { ...tag, count }
  //     })

  //     return <TagsList tags={tagsWithCount} title={block?.title || ''} />
  //   }

  //   case 'users': {
  //     const { docs: authors = [] } = await unstable_cache(
  //       async () =>
  //         await payload.find({
  //           collection: 'users',
  //           where: {
  //             role: {
  //               equals: 'author',
  //             },
  //           },
  //           limit: 1000,
  //         }),
  //       ['list', 'authors'],
  //       { tags: ['list-authors'] },
  //     )()

  //     return (
  //       <AuthorsList
  //         authors={authors.map(author => ({ ...author, count: 0 }))}
  //         block={block}
  //       />
  //     )
  //   }
  // }
}

export default List
