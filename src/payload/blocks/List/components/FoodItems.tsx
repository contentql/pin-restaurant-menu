'use client'

import { Category, FoodItem } from '@payload-types'
import { useDebouncedEffect } from '@payloadcms/ui'
import { Search } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'

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

const FoodList = memo(
  ({ foodItemsList }: { foodItemsList: [string, FoodItem[]][] }) => {
    if (!foodItemsList.length) {
      return (
        <div className='flex flex-col items-center justify-center pt-8'>
          <NoItemsLogo className='size-48' />
          No items found!
        </div>
      )
    }

    return foodItemsList.map(([categoryName, list]) => (
      <div key={categoryName} className='mb-6'>
        <p className='font-semibold text-text/70'>{categoryName}</p>
        <div>
          {list.map(foodItem => {
            return <FoodCard foodItem={foodItem} key={foodItem.id} />
          })}
        </div>
      </div>
    ))
  },
)
FoodList.displayName = 'FoodList'

const SearchBar = memo(({ isFetching }: { isFetching: boolean }) => {
  const { search, setSearch } = useFiltersContext()
  const [value, setValue] = useState(search)
  const isFirstRender = useRef(true)

  useDebouncedEffect(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }

      console.log('first render')
      setSearch(value)
    },
    [value],
    800,
  )

  return (
    <div className='relative flex-grow'>
      <Input
        placeholder='Search'
        className='pl-9'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Search size={20} className='absolute left-3 top-2.5 text-text/70' />
      {isFetching ? <Spinner className='absolute right-3 top-2.5' /> : null}
    </div>
  )
})
SearchBar.displayName = 'SearchBar'

const FoodItems = ({
  foodItems,
  categories,
}: {
  foodItems: FoodItem[]
  categories: Category[]
}) => {
  const { search, type, selectedCategories, specialItems } = useFiltersContext()
  const { setCartItems, setCollectionItems } = useCartContext()

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
      {
        ...(!filtersApplied ? { placeholderData: foodItems } : {}),
        select: list => {
          const items = list?.length
            ? list.reduce<Record<string, FoodItem[]>>((acc, current) => {
                const categories = current?.categories // Safely accessing

                if (categories && categories.length) {
                  categories.forEach(category => {
                    if (typeof category === 'object' && category?.name) {
                      // Ensure category and name exist
                      if (acc[category.name]) {
                        acc[category.name].push(current)
                      } else {
                        acc[category.name] = [current]
                      }
                    }
                  })
                }

                return acc
              }, {})
            : {}

          return Object.entries(items)
        },
      },
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

  return (
    <section>
      <div className='sticky top-14 z-10 flex w-[calc(100%+1rem)] -translate-x-2 items-center gap-2 bg-gradient-to-b from-background via-background/95 via-70% to-transparent pb-8 pt-4'>
        <SearchBar isFetching={isFetching} />
        <FilterDrawer categories={categories} />
      </div>

      <FoodList foodItemsList={foodItemsList} />

      <FloatButton />
    </section>
  )
}

export default FoodItems
