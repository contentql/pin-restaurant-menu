'use client'

import { Category, FoodItem } from '@payload-types'
import { useDebouncedEffect } from '@payloadcms/ui'
import { Search } from 'lucide-react'
import { useRef, useState } from 'react'

import { Input } from '@/components/common/Input'
import Spinner from '@/components/common/Spinner'
import { trpc } from '@/trpc/client'
import { useFiltersContext } from '@/utils/filtersContext'

import Cart from './Cart'
import FilterDrawer from './FilterDrawer'
import FoodCard from './FoodCard'

const FoodItems = ({
  foodItems,
  categories,
}: {
  foodItems: FoodItem[]
  categories: Category[]
}) => {
  const { search, setSearch, type, selectedCategories, specialItems } =
    useFiltersContext()
  const [value, setValue] = useState(search)
  const isFirstRender = useRef(true)
  const filtersApplied = search || type

  const { data: foodItemsList = [], isFetching } =
    trpc.foodItems.getAllItems.useQuery(
      {
        search,
        ...(type ? { type } : {}),
        ...(selectedCategories.length
          ? { categories: selectedCategories }
          : {}),
        ...(specialItems ? { special: specialItems } : {}),
      },
      { ...(!filtersApplied ? { placeholderData: foodItems } : {}) },
    )

  useDebouncedEffect(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }

      setSearch(value)
    },
    [value],
    800,
  )

  return (
    <section>
      <div className='flex items-center gap-2'>
        <div className='relative flex-grow'>
          <Input
            placeholder='Search'
            className='pl-9'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Search size={24} className='absolute left-2 top-2' />
          {isFetching ? <Spinner className='absolute right-3 top-2.5' /> : null}
        </div>

        <FilterDrawer categories={categories} />
      </div>

      {foodItemsList.map(foodItem => {
        return <FoodCard foodItem={foodItem} key={foodItem.id} />
      })}

      <Cart />
    </section>
  )
}

export default FoodItems
