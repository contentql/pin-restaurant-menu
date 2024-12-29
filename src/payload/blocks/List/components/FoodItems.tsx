'use client'

import { Category, FoodItem } from '@payload-types'
import { useDebouncedEffect } from '@payloadcms/ui'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { NoItemsLogo } from '@/components/SVG'
import { Input } from '@/components/common/Input'
import Spinner from '@/components/common/Spinner'
import { trpc } from '@/trpc/client'
import {
  CartItemType,
  LocalStorageCollectionType,
  LocalStorageItemsType,
  useCartContext,
} from '@/utils/cartContext'
import { useFiltersContext } from '@/utils/filtersContext'

import FilterDrawer from './FilterDrawer'
import FloatButton from './FloatButton'
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
  const { setCartItems, setCollectionItems } = useCartContext()
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

  // This effect syncs the local-storage with cartContext
  useEffect(() => {
    // updating the cartItems
    const localStorageItems: LocalStorageItemsType = JSON.parse(
      window.localStorage.getItem('cart') ?? '[]',
    )
    const cartItems: CartItemType[] = []

    if (localStorageItems.length && foodItems.length) {
      localStorageItems.forEach(item => {
        const filteredFoodItem = foodItems.find(
          foodItem => foodItem.id === item.id,
        )

        if (filteredFoodItem) {
          cartItems.push({ ...filteredFoodItem, quantity: item.quantity })
        }
      })

      setCartItems(cartItems)
    }

    // updating the collection items
    const localStorageCollectionItems: LocalStorageCollectionType = JSON.parse(
      window.localStorage.getItem('collections') ?? '[]',
    )
    const collectionItemsList: FoodItem[] = []

    if (localStorageCollectionItems.length && foodItems.length) {
      localStorageCollectionItems.forEach(item => {
        const filteredFoodItem = foodItems.find(
          foodItem => foodItem.id === item.id,
        )

        if (filteredFoodItem) {
          collectionItemsList.push(filteredFoodItem)
        }
      })

      setCollectionItems(collectionItemsList)
    }
  }, [foodItems, setCartItems, setCollectionItems])

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

      {foodItemsList.length ? (
        foodItemsList.map(foodItem => {
          return <FoodCard foodItem={foodItem} key={foodItem.id} />
        })
      ) : (
        <div className='flex flex-col items-center justify-center pt-8'>
          <NoItemsLogo className='size-48' />
          No items found!
        </div>
      )}

      <FloatButton />
    </section>
  )
}

export default FoodItems
