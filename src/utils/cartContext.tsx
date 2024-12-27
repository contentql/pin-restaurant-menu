'use client'

import { FoodItem } from '@payload-types'
import React, { createContext, use, useState } from 'react'

type FiltersContextType = {
  cartItems: CartItemType[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>
  collectionItems: FoodItem[]
  setCollectionItems: React.Dispatch<React.SetStateAction<FoodItem[]>>
}

const Context = createContext<FiltersContextType | undefined>(undefined)

export const useCartContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }

  return context
}

interface CartItemType extends FoodItem {
  quantity: number
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [collectionItems, setCollectionItems] = useState<FoodItem[]>([])

  return (
    <Context.Provider
      value={{ cartItems, setCartItems, collectionItems, setCollectionItems }}>
      {children}
    </Context.Provider>
  )
}
