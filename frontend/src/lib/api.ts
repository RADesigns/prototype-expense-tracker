import type { ApiRoutes } from '@server/app'
import { hc } from 'hono/client'
import { queryOptions } from '@tanstack/react-query'

const client = hc<ApiRoutes>('/')

export const api = client.api

async function getCurrentUser() {
    const res = await api.me.$get()
    if(!res.ok) {
      throw new Error("server error")
    }
    const data = await res.json()
    return data 
  }

export const useQueryOptions = queryOptions({
    queryKey: ['get-current-user'],
    queryFn: getCurrentUser,
    staleTime: Infinity
})