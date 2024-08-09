import { createFileRoute } from '@tanstack/react-router'

import  { api }  from '@/lib/api'

//import  { useQueryOptions }  from '@/lib/api'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/_authenticated/')({
  component: App
})

async function getTotalSpent() {
  const res = await api.expenses['total-spent'].$get()
  if(!res.ok) {
    throw new Error("server error")
  }
  const data = await res.json()
  return data 
}

function App() {
  const { isPending, error, data } = useQuery({ queryKey: ['get-total-spent'], queryFn: getTotalSpent })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    
    <div className="flex flex-col bg-background m-auto max-w-5xl gap-y-5">
      <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total Amount</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.total}</CardContent>
      </Card>
    </div>
  )
}

export default App
