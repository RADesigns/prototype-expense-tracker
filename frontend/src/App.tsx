import { useEffect, useState } from 'react'
import  { api }  from '@/lib/api'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function getAmount () {
      const res = await api.expenses['total-spent'].$get()
      const data = await res.json()
      setTotalSpent(data.total)
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
