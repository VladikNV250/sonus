import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { FC, PropsWithChildren } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
})

const persister = createAsyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    key: 'sonus-query-cache',
})

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
            onSuccess={() => {
                void queryClient.resumePausedMutations().then(() => {
                    void queryClient.invalidateQueries()
                })
            }}
        >
            {children}
        </PersistQueryClientProvider>
    )
}
