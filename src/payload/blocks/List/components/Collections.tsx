'use client'

import { FoodItem } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react'

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
  const { collectionItems, setCollectionItems, cartItems, setCartItems } =
    useCartContext()

  const { name, type, id, price } = item

  // Add's items from collection to cart
  const handleAddItemToCart = (item: FoodItem) => {
    const itemAlreadyExists = cartItems.findIndex(
      cartItem => cartItem.id === item.id,
    )

    if (itemAlreadyExists >= 0) {
      setCartItems(current =>
        current.map((cartItem, index) => {
          if (index === itemAlreadyExists) {
            return { ...cartItem, quantity: cartItem.quantity + 1 }
          }

          return cartItem
        }),
      )
    } else {
      setCartItems(current => {
        return [...current, { ...item, quantity: 1 }]
      })
    }

    setCollectionItems(current => current.filter(item => item.id !== id))
  }

  return (
    <motion.div className='flex justify-between text-sm' layout>
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
    </motion.div>
  )
}

const Collection = () => {
  const { collectionItems } = useCartContext()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className='relative'>
          <Button className='px-2.5' aria-label='Collections'>
            <Heart size={20} />
          </Button>

          {collectionItems.length ? (
            <div className='absolute -right-4 -top-2 grid min-h-6 min-w-6 select-none place-items-center rounded-full bg-text px-1 text-xs text-background'>
              <span className='leading-none'>{collectionItems.length}</span>
            </div>
          ) : null}
        </div>
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined}>
        <div className='mx-auto w-full max-w-md px-4'>
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

          <div
            className='max-h-[70vh] overflow-y-scroll'
            style={{ scrollbarGutter: 'stable' }}>
            {collectionItems.length ? (
              <div className='flex flex-col gap-y-4 pb-8'>
                <AnimatePresence>
                  {collectionItems.map((item, index) => {
                    return (
                      <CollectionItem key={index} index={index} item={item} />
                    )
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center pb-8'>
                <NoCollectionLogo className='size-32' />
                <p>Collection is Empty!</p>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Collection
