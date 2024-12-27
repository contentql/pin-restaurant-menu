'use client'

import {
  Options,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs'
import React, { createContext, use } from 'react'

type FiltersContextType = {
  search: string
  setSearch: (
    value: string | ((old: string) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>
  type: 'veg' | 'nonVeg' | null
  setType: (
    value:
      | 'veg'
      | 'nonVeg'
      | ((old: 'veg' | 'nonVeg' | null) => 'veg' | 'nonVeg' | null)
      | null,
    options?: Options,
  ) => Promise<URLSearchParams>
  selectedCategories: string[]
  setSelectedCategories: (
    value: string[] | ((old: string[]) => string[] | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>
  specialItems: boolean | null
  setSpecialItems: (
    value: boolean | ((old: boolean | null) => boolean | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>
  resetFilters: () => void
}

const Context = createContext<FiltersContextType | undefined>(undefined)

export const useFiltersContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider')
  }

  return context
}

export const foodType = ['veg', 'nonVeg'] as const

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  )

  const [type, setType] = useQueryState('type', parseAsStringLiteral(foodType))
  const [selectedCategories, setSelectedCategories] = useQueryState(
    'categories',
    parseAsArrayOf(parseAsString, ';').withDefault([]),
  )
  const [specialItems, setSpecialItems] = useQueryState(
    'special',
    parseAsBoolean,
  )

  const resetFilters = () => {
    setType(null)
    setSelectedCategories([])
    setSpecialItems(null)
  }

  return (
    <Context.Provider
      value={{
        search,
        setSearch,
        type,
        setType,
        selectedCategories,
        setSelectedCategories,
        specialItems,
        setSpecialItems,
        resetFilters,
      }}>
      {children}
    </Context.Provider>
  )
}
