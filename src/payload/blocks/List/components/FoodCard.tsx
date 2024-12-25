'use client'

import NumberFlow from '@number-flow/react'
import { Heart, Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { NonVegLogo } from '@/components/SVG'
import Button from '@/components/common/Button'
import { DialogTitle } from '@/components/common/Dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/common/Drawer'

const FoodCard = () => {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <>
      <div
        onClick={() => setOpen(current => !current)}
        className='my-4 flex w-full cursor-pointer justify-between gap-2 rounded-sm border p-4 shadow-md'>
        <div>
          <NonVegLogo />

          <p className='mt-2 line-clamp-1 font-display text-lg'>
            Mutton Dum Biryani
          </p>

          <p className='text-sm font-semibold'>₹ 350</p>

          <p className='line-clamp-2 text-sm text-text/70'>
            Biryani served with Two pieces of Mutton, Salan, Raita.
          </p>
        </div>

        <div className='relative'>
          <div className='relative size-32 flex-shrink-0 overflow-hidden rounded'>
            <Image
              src={'/mutton-biryani.webp'}
              fill
              alt='Mutton Biryani'
              sizes='600px'
            />
          </div>

          <div className='absolute -bottom-2 flex w-full justify-center gap-2'>
            <Button
              className=''
              onClick={e => {
                e.stopPropagation()
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
        <DrawerContent>
          <div className='mx-auto w-full max-w-md'>
            <DrawerHeader className='relative mb-4'>
              <DialogTitle className='sr-only'>
                Mutton Biryani Details
              </DialogTitle>

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
                <SwiperSlide className='relative bg-secondary'>
                  <Image
                    src={'/mutton-biryani.webp'}
                    fill
                    alt='Mutton Biryani'
                    sizes='600px'
                  />
                </SwiperSlide>

                <SwiperSlide className='relative bg-secondary'>
                  <Image
                    src={'/mutton-biryani.webp'}
                    fill
                    alt='Mutton Biryani'
                    sizes='600px'
                  />
                </SwiperSlide>

                <SwiperSlide className='relative bg-secondary'>
                  <Image
                    src={'/mutton-biryani.webp'}
                    fill
                    alt='Mutton Biryani'
                    sizes='600px'
                  />
                </SwiperSlide>

                <SwiperSlide className='relative bg-secondary'>
                  <Image
                    src={'/mutton-biryani.webp'}
                    fill
                    alt='Mutton Biryani'
                    sizes='600px'
                  />
                </SwiperSlide>
              </Swiper>

              <div className='mt-4'>
                <NonVegLogo />

                <p className='mt-2 line-clamp-1 font-display text-lg'>
                  Mutton Dum Biryani
                </p>

                <p className='text-sm font-semibold'>₹ 350</p>

                <p className='text-sm text-text/70'>
                  Biryani served with Two pieces of Mutton, Salan, Raita.
                </p>
              </div>

              <DrawerFooter className='flex-row items-center gap-2  px-0'>
                <div className='flex items-center gap-2 rounded border'>
                  <Button
                    variant='outline'
                    className='border-none py-1'
                    onClick={() =>
                      setCount(current => {
                        if (current === 0) {
                          return current
                        }

                        return current - 1
                      })
                    }>
                    <Minus size={16} />
                  </Button>

                  <div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
                    <NumberFlow
                      value={count}
                      aria-hidden='true'
                      className='pointer-events-none'
                    />
                  </div>

                  <Button
                    variant='outline'
                    className='border-none py-1'
                    onClick={() => setCount(current => current + 1)}>
                    <Plus size={16} />
                  </Button>
                </div>

                <Button className='flex-grow'>
                  Add Item | ₹ {350 * (count || 1)}
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
