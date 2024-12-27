'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import { KBarProvider } from 'kbar'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import React, { useState } from 'react'
import SuperJSON from 'superjson'

import { trpc } from '@/trpc/client'
import { CartProvider } from '@/utils/cartContext'
import { FiltersProvider } from '@/utils/filtersContext'

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
          transformer: SuperJSON,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar
          height='2px'
          color='#A978DE'
          options={{ showSpinner: false }}
        />
        <NuqsAdapter>
          <KBarProvider>
            <FiltersProvider>
              <CartProvider>{children}</CartProvider>
            </FiltersProvider>
          </KBarProvider>
        </NuqsAdapter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
