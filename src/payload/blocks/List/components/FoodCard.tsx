'use client'

import { formatCurrency } from '@contentql/core/client'
import { FoodItem } from '@payload-types'
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react'
import Image from 'next/image'
import { memo, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

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
import { getCurrencySymbol } from '@/utils/currency'
import { useMetadata } from '@/utils/metadataContext'

import OrderInput from './OrderInput'

const SlideButton = ({ dir }: { dir: 'right' | 'left' }) => {
  const swiper = useSwiper()

  return (
    <Button
      size='icon'
      variant='outline'
      onClick={() => {
        if (dir === 'right') {
          swiper.slideNext()
        } else {
          swiper.slidePrev()
        }
      }}>
      {dir === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </Button>
  )
}

const FoodCard = memo(({ foodItem }: { foodItem: FoodItem }) => {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(1)

  const { setCartItems, setCollectionItems, collectionItems, cartItems } =
    useCartContext()
  const { general, themeSettings } = useMetadata()

  const formattedCurrency = formatCurrency({
    amount: foodItem.price,
    currencyCode: general.currency,
  })

  const currencySymbol = getCurrencySymbol(general.currency)

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
    const alreadyAddedCartItem = cartItems.find(item => item.id === foodItem.id)

    if (alreadyAddedCartItem) {
      setCartItems(current =>
        current.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + count }
          }

          return item
        }),
      )
    }
    // If item not added to cart adding that with that quantity
    else {
      setCartItems(current => [...current, { ...foodItem, quantity: count }])
    }

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
  const cartItem = cartItems.find(item => item.id === id)

  return (
    <>
      <div
        onClick={() => setOpen(current => !current)}
        className={`mb-4 mt-2 flex w-full cursor-pointer ${themeSettings.radius === 'full' ? 'rounded-lg' : 'rounded'} justify-between gap-2  border p-4 shadow-md`}>
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

          <p className='text-sm font-semibold'>{formattedCurrency}</p>

          <p className='line-clamp-2 text-sm text-text/70'>{description}</p>
        </div>

        <div className='relative'>
          <div
            className={`relative size-32 flex-shrink-0 overflow-hidden rounded bg-foreground/50`}>
            {coverPic ? (
              <Image src={coverPic.url} fill alt={coverPic.alt} sizes='600px' />
            ) : null}
          </div>

          <div className='absolute -bottom-2 flex w-full justify-center gap-2'>
            {cartItem ? (
              <OrderInput
                value={cartItem.quantity}
                onChange={type => {
                  const addedItemIndex = cartItems.findIndex(
                    item => item.id === foodItem.id,
                  )

                  if (addedItemIndex >= 0) {
                    const item = cartItems[addedItemIndex]

                    if (type === 'dec' && item && item.quantity === 1) {
                      return setCartItems(current => {
                        let frontPart = current.slice(0, addedItemIndex)
                        let lastPart = current.slice(addedItemIndex + 1)

                        return [...frontPart, ...lastPart]
                      })
                    }

                    setCartItems(current =>
                      current.map((cartItem, i) => {
                        if (i === addedItemIndex) {
                          return {
                            ...cartItem,
                            quantity:
                              cartItem.quantity + (type === 'dec' ? -1 : 1),
                          }
                        }

                        return cartItem
                      }),
                    )
                  }
                }}
              />
            ) : (
              <>
                <Button
                  aria-label='Add to cart'
                  onClick={e => {
                    e.stopPropagation()

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
                  aria-label='Add to collection'
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
              </>
            )}
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
                loop
                className={`mx-auto h-60 w-full ${themeSettings.radius === 'full' ? 'rounded-lg' : 'rounded'}`}>
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

                {images && images.length > 1 ? (
                  <div className='absolute bottom-4 right-4 z-10 mt-4 flex w-full items-center justify-end gap-3'>
                    <div className='w-max space-x-2 rounded bg-background/50 p-2 backdrop-blur-lg '>
                      <SlideButton dir='left' />
                      <SlideButton dir='right' />
                    </div>
                  </div>
                ) : null}
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

                <p className='text-sm font-semibold'>{formattedCurrency}</p>

                <p className='text-sm text-text/70'>{description}</p>
              </div>

              <DrawerFooter className='flex-row items-center gap-2  px-0'>
                <OrderInput
                  value={count}
                  onChange={type => {
                    setCount(current => {
                      if (type === 'inc') {
                        return current + 1
                      } else if (type === 'dec' && current === 1) {
                        return current
                      }
                      return current - 1
                    })
                  }}
                />

                <Button className='flex-grow' onClick={handleAddItem}>
                  Add Item | {`${currencySymbol} ${price * count}`}
                </Button>
              </DrawerFooter>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
})

FoodCard.displayName = 'FoodCard'

export default FoodCard
