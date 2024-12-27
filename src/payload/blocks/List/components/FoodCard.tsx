'use client'

import { FoodItem } from '@payload-types'
import { useDebouncedEffect } from '@payloadcms/ui'
import { Heart, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
// import 'swiper/css'
// import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
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
  const { setCartItems } = useCartContext()

  useDebouncedEffect(
    () => {
      if (isPending) {
        setIsPending(false)
      }
    },
    [isPending],
    300,
  )

  const { name, price, type, gallery, description, special } = foodItem

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

  const coverPic = images[0]

  return (
    <>
      <div
        onClick={() => setOpen(current => !current)}
        className='my-4 flex w-full cursor-pointer justify-between gap-2 rounded-sm border p-4 shadow-md'>
        <div>
          <div className='flex items-center gap-2'>
            {type === 'nonVeg' ? <NonVegLogo /> : <VegLogo />}

            {special && (
              <span className='inline-flex items-center gap-x-1.5 rounded-full border border-yellow-800 bg-amber-100 px-1.5 text-xs font-medium text-yellow-800'>
                Special
              </span>
            )}
          </div>

          <p className='mt-2 line-clamp-1 font-display text-lg'>{name}</p>

          <p className='text-sm font-semibold'>₹ {price}</p>

          <p className='line-clamp-2 text-sm text-text/70'>{description}</p>
        </div>

        <div className='relative'>
          <div className='relative size-32 flex-shrink-0 overflow-hidden rounded'>
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
                  const AddedItemIndex = current.findIndex(
                    item => item.id === foodItem.id,
                  )

                  if (AddedItemIndex >= 0) {
                    return current.map((item, index) => {
                      if (index === AddedItemIndex) {
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
              }}
              className='bg-background px-3 hover:bg-secondary'>
              <Heart size={16} />
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
                className='mx-auto h-60 w-full rounded'>
                {images
                  ? images.map(item => {
                      if (item) {
                        return (
                          <SwiperSlide
                            className='relative bg-secondary'
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
                <NonVegLogo />

                <p className='mt-2 line-clamp-1 font-display text-lg'>{name}</p>

                <p className='text-sm font-semibold'>₹ {price}</p>

                <p className='text-sm text-text/70'>{description}</p>
              </div>

              <DrawerFooter className='flex-row items-center gap-2  px-0'>
                <OrderInput count={count} setCount={setCount} />

                <Button className='flex-grow'>
                  Add Item | ₹ {price * (count || 1)}
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
