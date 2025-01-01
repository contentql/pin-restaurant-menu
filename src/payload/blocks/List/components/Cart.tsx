'use client'

import { ShoppingCart, X } from 'lucide-react'

import { CartEmptyIcon, NonVegLogo, VegLogo } from '@/components/SVG'
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

  // on quantity change updating the cart items count
  const handleQuantityChange = ({
    type,
    itemIndex,
  }: {
    type: 'inc' | 'dec'
    itemIndex: number
  }) => {
    const item = cartItems.find((_item, index) => index === itemIndex)

    if (type === 'dec' && item && item.quantity === 1) {
      return setCartItems(current => {
        let frontPart = current.slice(0, itemIndex)
        let lastPart = current.slice(itemIndex + 1)

        return [...frontPart, ...lastPart]
      })
    }

    setCartItems(current =>
      current.map((cartItem, i) => {
        if (i === itemIndex) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + (type === 'dec' ? -1 : 1),
          }
        }

        return cartItem
      }),
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='px-2.5'>
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

          {cartItems.length ? (
            cartItems.map(({ name, price, quantity, type, id }, index) => {
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
                      value={quantity}
                      onChange={type => {
                        handleQuantityChange({ type, itemIndex: index })
                      }}
                    />
                    <span className='text-nowrap font-semibold'>
                      ₹ {quantity * price}
                    </span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='flex flex-col items-center justify-center pb-8'>
              <CartEmptyIcon className='size-32' />
              <p>Cart is Empty!</p>
            </div>
          )}

          {cartItems.length ? (
            <DrawerFooter className='flex-row justify-between border-t border-dashed px-0 text-sm'>
              <p>Total Bill:</p>
              <span className='font-semibold'>
                ₹{' '}
                {cartItems.reduce(
                  (acc, current) => acc + current.price * current.quantity,
                  0,
                )}
              </span>
            </DrawerFooter>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Cart
