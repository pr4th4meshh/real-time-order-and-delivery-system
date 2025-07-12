import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  )
}
