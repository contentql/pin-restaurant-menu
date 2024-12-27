'use client'

import { ShoppingCart, X } from 'lucide-react'

import { NonVegLogo, VegLogo } from '@/components/SVG'
import Button from '@/components/common/Button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/common/Drawer'
import { useCartContext } from '@/utils/cartContext'

import OrderInput from './OrderInput'

const Cart = () => {
  const { cartItems, setCartItems } = useCartContext()
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='fixed bottom-4 left-4 px-2.5'>
          <ShoppingCart size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined}>
        <div className='mx-auto w-full max-w-md space-y-6 px-4'>
          <DrawerHeader className='relative px-0'>
            <DrawerTitle>Cart</DrawerTitle>

            <DrawerClose asChild>
              <Button
                variant='outline'
                size='icon'
                className='absolute right-0 top-2'>
                <X size={20} />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          {cartItems.length
            ? cartItems.map(({ name, price, quantity, type, id }) => {
                return (
                  <div className='flex justify-between text-sm' key={id}>
                    <div className='flex items-center gap-2'>
                      {type === 'nonVeg' ? (
                        <NonVegLogo className='size-4 flex-shrink-0' />
                      ) : (
                        <VegLogo className='size-4 flex-shrink-0' />
                      )}
                      <span className='text-wrap'>{name}</span>
                    </div>

                    <div className='flex items-center gap-2'>
                      <OrderInput
                        size='small'
                        count={quantity}
                        setCount={() => {}}
                      />
                      <span className='text-nowrap font-semibold'>
                        ₹ {quantity * price}
                      </span>
                    </div>
                  </div>
                )
              })
            : null}

          <DrawerFooter className='flex-row justify-between border-t border-dashed px-0 text-sm'>
            <p>Total Bill:</p>
            <span className='font-semibold'>₹ 350</span>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Cart
