'use client'

import { Options, parseAsString, useQueryState } from 'nuqs'
import React, { createContext, use } from 'react'

type FiltersContextType = {
  search: string
  setSearch: (
    value: string | ((old: string) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>
}

const Context = createContext<FiltersContextType | undefined>(undefined)

export const useFiltersContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('useMetadata must be used within a MetadataProvider')
  }

  return context
}

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  )

  return (
    <Context.Provider
      value={{
        search,
        setSearch,
      }}>
      {children}
    </Context.Provider>
  )
}
