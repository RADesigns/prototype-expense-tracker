import { useEffect, useState } from 'react'
import {type ApiRoutes } from '../../server/app'
import { hc } from 'hono/client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const client = hc<ApiRoutes>('/')

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function getAmount () {
      const res = await client.api.expenses['total-spent'].$get()
      const {total} = await res.json()
      setTotalSpent(total)
    }
    getAmount()
  }, [])

  return (
    
    <div className="flex flex-col bg-background m-auto max-w-5xl gap-y-5">
      <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total Amount</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
      </Card>
    </div>
  )
}

export default App
