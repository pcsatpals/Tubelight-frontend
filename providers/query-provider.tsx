"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function QueryProvider({ children }: { children: React.ReactNode }) {
    // Use useState to prevent re-creating the client on every re-render
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* This adds the floating DevTools button in development mode only */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}