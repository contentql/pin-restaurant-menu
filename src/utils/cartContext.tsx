'use client'

import { FoodItem } from '@payload-types'
import React, { createContext, use, useEffect, useRef, useState } from 'react'

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

export interface CartItemType extends FoodItem {
  quantity: number
}

export type LocalStorageItemsType = { id: number; quantity: number }[]
export type LocalStorageCollectionType = { id: number }[]

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [collectionItems, setCollectionItems] = useState<FoodItem[]>([])
  // this ref's are to prevent useEffect running on initial mount
  const isFirstCartRender = useRef(true)
  const isFirstCollectionRender = useRef(true)

  // whenever changes in cart it'll sync with local storage
  useEffect(() => {
    if (isFirstCartRender.current) {
      isFirstCartRender.current = false
      return
    }

    const localStorageItems = cartItems.length
      ? cartItems.map(item => ({ id: item.id, quantity: item.quantity }))
      : []

    window.localStorage.setItem('cart', JSON.stringify(localStorageItems))
  }, [cartItems])

  // whenever changes in collection items it'll sync with local storage
  useEffect(() => {
    if (isFirstCollectionRender.current) {
      isFirstCollectionRender.current = false
      return
    }

    const localStorageItems = collectionItems.length
      ? collectionItems.map(item => ({ id: item.id }))
      : []

    window.localStorage.setItem(
      'collections',
      JSON.stringify(localStorageItems),
    )
  }, [collectionItems])

  return (
    <Context.Provider
      value={{ cartItems, setCartItems, collectionItems, setCollectionItems }}>
      {children}
    </Context.Provider>
  )
}
