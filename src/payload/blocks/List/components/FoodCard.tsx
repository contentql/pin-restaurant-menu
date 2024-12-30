'use client'

import { FoodItem } from '@payload-types'
import { useDebouncedEffect } from '@payloadcms/ui'
import { Heart, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NonVegLogo, VegLogo } from '@/components/SVG'
import Button from '@/components/common/Button'
import { DialogTitle } from '@/components/common/Dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/common/Drawer'
import { useCartContext } from '@/utils/cartContext'

import OrderInput from './OrderInput'

const FoodCard = ({ foodItem }: { foodItem: FoodItem }) => {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [isPending, setIsPending] = useState(false)
  const { setCartItems, setCollectionItems, collectionItems } = useCartContext()

  // useDebouncedEffect hook will set loading state to false again after 300ms
  useDebouncedEffect(
    () => {
      if (isPending) {
        setIsPending(false)
      }
    },
    [isPending],
    300,
  )

  const { name, price, type, gallery, description, special, id } = foodItem

  const images = gallery
    ? gallery.map(image => {
        if (typeof image === 'object') {
          return {
            url: image.url ?? '',
            alt: image.alt ?? '',
          }
        }
      })
    : []

  // showing first image on the card
  const coverPic = images[0]

  // this function adds items to cart with quantity
  const handleAddItem = () => {
    setCartItems(current =>
      current.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + count }
        }

        return item
      }),
    )
    setOpen(false)
    setCount(1)
  }

  // this function add items to collection context
  const handleAddCollection = () => {
    setCollectionItems(current => {
      const addedItemIndex = current.findIndex(item => {
        return item.id === id
      })

      if (addedItemIndex >= 0) {
        // If the item exists, return a new array without it
        return current.filter(item => item.id !== id)
      }

      return [...current, foodItem]
    })
  }

  // boolean for highlighting heart icon
  const isActive = collectionItems.find(item => item.id === id)

  return (
    <>
      <div
        onClick={() => setOpen(current => !current)}
        className='my-4 flex w-full cursor-pointer justify-between gap-2 rounded-md border p-4 shadow-md'>
        <div>
          <div className='flex items-center gap-2'>
            {type === 'nonVeg' ? <NonVegLogo /> : <VegLogo />}

            {special && (
              <span className='inline-flex items-center gap-x-1.5 rounded border border-yellow-800 bg-amber-100 px-1.5 text-xs font-medium text-yellow-800 dark:border-yellow-400/20 dark:bg-yellow-400/10 dark:text-yellow-500'>
                Special
              </span>
            )}
          </div>

          <p className='mt-2 font-display'>{name}</p>

          <p className='text-sm font-semibold'>₹ {price}</p>

          <p className='line-clamp-2 text-sm text-text/70'>{description}</p>
        </div>

        <div className='relative'>
          <div className='relative size-32 flex-shrink-0 overflow-hidden rounded-sm'>
            {coverPic ? (
              <Image src={coverPic.url} fill alt={coverPic.alt} sizes='600px' />
            ) : (
              <Image
                src={'/mutton-biryani.webp'}
                fill
                alt='Mutton Biryani'
                sizes='600px'
              />
            )}
          </div>

          <div className='absolute -bottom-2 flex w-full justify-center gap-2'>
            <Button
              className=''
              isLoading={isPending}
              onClick={e => {
                e.stopPropagation()

                setIsPending(true)

                setCartItems(current => {
                  // later updating the local state
                  const addedItemIndex = current.findIndex(
                    item => item.id === foodItem.id,
                  )

                  if (addedItemIndex >= 0) {
                    return current.map((item, index) => {
                      if (index === addedItemIndex) {
                        return { ...item, quantity: item.quantity + 1 }
                      }

                      return item
                    })
                  } else {
                    return [...current, { ...foodItem, quantity: 1 }]
                  }
                })
              }}>
              ADD +
            </Button>

            <Button
              variant='outline'
              onClick={e => {
                e.stopPropagation()
                handleAddCollection()
              }}
              className='bg-background px-3 hover:bg-foreground'>
              <Heart
                size={16}
                className={`${isActive ? 'fill-primary' : ''}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent aria-describedby={undefined}>
          <div className='mx-auto w-full max-w-md'>
            <DrawerHeader className='relative mb-4'>
              <DialogTitle className='sr-only'>{name} Details</DialogTitle>

              <DrawerClose asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='absolute right-3 top-2 sm:right-0'>
                  <X size={20} />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className='px-4'>
              <Swiper
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className='mx-auto h-60 w-full rounded-sm'>
                {images
                  ? images.map(item => {
                      if (item) {
                        return (
                          <SwiperSlide
                            className='bg-secondary relative'
                            key={item.alt}>
                            <Image
                              src={item.url}
                              fill
                              alt={item.alt}
                              sizes='600px'
                              className='object-cover'
                            />
                          </SwiperSlide>
                        )
                      }

                      return null
                    })
                  : null}
              </Swiper>

              <div className='mt-4'>
                <div className='flex items-center gap-2'>
                  {type === 'nonVeg' ? <NonVegLogo /> : <VegLogo />}

                  {special && (
                    <span className='inline-flex items-center gap-x-1.5 rounded border border-yellow-800 bg-amber-100 px-1.5 text-xs font-medium text-yellow-800 dark:border-yellow-400/20 dark:bg-yellow-400/10 dark:text-yellow-500'>
                      Special
                    </span>
                  )}
                </div>

                <p className='mt-2 line-clamp-1 font-display text-lg'>{name}</p>

                <p className='text-sm font-semibold'>₹ {price}</p>

                <p className='text-sm text-text/70'>{description}</p>
              </div>

              <DrawerFooter className='flex-row items-center gap-2  px-0'>
                <OrderInput
                  defaultValue={count}
                  onChange={value => {
                    setCount(value)
                  }}
                />

                <Button className='flex-grow' onClick={handleAddItem}>
                  Add Item | ₹ {price * count}
                </Button>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FoodCard
