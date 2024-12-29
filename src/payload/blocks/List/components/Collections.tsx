'use client'

import { FoodItem } from '@payload-types'
import { useDebouncedEffect } from '@payloadcms/ui'
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react'
import { useState } from 'react'

import { NoCollectionLogo, NonVegLogo, VegLogo } from '@/components/SVG'
import Button from '@/components/common/Button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/common/Drawer'
import { useCartContext } from '@/utils/cartContext'

const CollectionItem = ({ item, index }: { item: FoodItem; index: number }) => {
  const [isPending, setIsPending] = useState(false)
  const { collectionItems, setCollectionItems, cartItems, setCartItems } =
    useCartContext()

  useDebouncedEffect(
    () => {
      setIsPending(false)
    },
    [isPending],
    300,
  )

  const { name, type, id, price } = item

  // Add's items from collection to cart
  const handleAddItemToCart = (item: FoodItem) => {
    setIsPending(true)

    const itemAlreadyExists = cartItems.findIndex(
      cartItem => cartItem.id === item.id,
    )

    if (itemAlreadyExists >= 0) {
      return setCartItems(current =>
        current.map((cartItem, index) => {
          if (index === itemAlreadyExists) {
            return { ...cartItem, quantity: cartItem.quantity + 1 }
          }

          return cartItem
        }),
      )
    }

    setCartItems(current => {
      return [...current, { ...item, quantity: 1 }]
    })
  }

  return (
    <div className='flex justify-between text-sm'>
      <div className='flex items-center gap-2'>
        {type === 'nonVeg' ? (
          <NonVegLogo className='size-4 flex-shrink-0' />
        ) : (
          <VegLogo className='size-4 flex-shrink-0' />
        )}
        <span className='text-wrap'>{name}</span>
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-nowrap font-semibold'>₹ {price}</span>

        <Button
          variant='outline'
          size='icon'
          isLoading={isPending}
          onClick={() => {
            handleAddItemToCart(collectionItems[index])
          }}>
          <ShoppingCart size={16} />
        </Button>

        <Button
          variant='outline'
          size='icon'
          onClick={() => {
            setCollectionItems(current =>
              current.filter(item => item.id !== id),
            )
          }}>
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  )
}

const Collection = () => {
  const { collectionItems } = useCartContext()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='px-2.5'>
          <Heart size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined}>
        <div className='mx-auto w-full max-w-md space-y-6 px-4'>
          <DrawerHeader className='relative px-0'>
            <DrawerTitle>Collection</DrawerTitle>

            <DrawerClose asChild>
              <Button
                variant='outline'
                size='icon'
                className='absolute right-0 top-2'>
                <X size={20} />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          {collectionItems.length ? (
            <div className='space-y-4 pb-8'>
              {collectionItems.map((item, index) => {
                return <CollectionItem key={index} index={index} item={item} />
              })}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center pb-8'>
              <NoCollectionLogo className='size-32' />
              <p>Collection is Empty!</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Collection
