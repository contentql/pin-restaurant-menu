'use client'

import { ShoppingCart, X } from 'lucide-react'
import { useMemo } from 'react'

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
import { getCurrencySymbol } from '@/utils/currency'
import { useMetadata } from '@/utils/metadataContext'

import OrderInput from './OrderInput'

const Cart = () => {
  const { cartItems, setCartItems } = useCartContext()
  const {
    general: { taxes, currency, discount = 0 },
  } = useMetadata()

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

  const calculatedPrice = useMemo(() => {
    const itemsPrice = cartItems.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0,
    )

    const discountPrice = (itemsPrice / 100) * (discount ?? 0)

    let taxAmount = 0

    const taxesList = taxes?.length
      ? taxes.map(tax => {
          const calculatedTax =
            ((itemsPrice - discountPrice) / 100) * tax.percentage

          taxAmount += calculatedTax

          return {
            amount: calculatedTax,
            name: tax.name,
            percentage: tax.percentage,
          }
        })
      : []

    return {
      taxesList,
      discountPrice,
      totalPrice: itemsPrice - discountPrice + taxAmount,
      originalPrice: itemsPrice,
    }
  }, [cartItems, taxes, discount])

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className='relative'>
          <Button className='px-2.5'>
            <ShoppingCart size={20} />
          </Button>

          {cartItems.length ? (
            <div className='absolute -right-4 -top-2 grid min-h-6 min-w-6 select-none place-items-center rounded-full bg-text px-1 text-xs text-background'>
              <span className='leading-none'>{cartItems.length}</span>
            </div>
          ) : null}
        </div>
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined}>
        <div className='mx-auto w-full max-w-md px-4'>
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

          <div
            className='max-h-[40vh] overflow-y-scroll'
            style={{ scrollbarGutter: 'stable' }}>
            {cartItems.length ? (
              cartItems.map(({ name, price, quantity, type, id }, index) => {
                return (
                  <div className='mb-4 flex justify-between text-sm' key={id}>
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
          </div>

          {cartItems.length ? (
            <DrawerFooter className='mt-0 border-t border-dashed px-0 text-sm'>
              <div className='flex w-full justify-between'>
                <p>Items Total:</p>
                <span className='font-semibold'>
                  {`${getCurrencySymbol(currency)} ${calculatedPrice.originalPrice}`}
                </span>
              </div>

              {calculatedPrice.discountPrice ? (
                <div className='flex w-full justify-between'>
                  <p>{`Discount (${discount}%)`}:</p>
                  <span className='font-semibold'>
                    {`- ${getCurrencySymbol(currency)} ${calculatedPrice.discountPrice}`}
                  </span>
                </div>
              ) : null}

              {calculatedPrice.taxesList
                ? calculatedPrice.taxesList.map(tax => (
                    <div key={tax.name} className='flex w-full justify-between'>
                      <p>{`${tax.name} (${tax.percentage}%)`}:</p>
                      <span className='font-semibold'>
                        {`${getCurrencySymbol(currency)} ${tax.amount}`}
                      </span>
                    </div>
                  ))
                : null}

              <div className='flex w-full justify-between'>
                <p>To Pay:</p>
                <span className='font-semibold'>
                  {`${getCurrencySymbol(currency)} ${calculatedPrice.totalPrice}`}
                </span>
              </div>
            </DrawerFooter>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Cart
