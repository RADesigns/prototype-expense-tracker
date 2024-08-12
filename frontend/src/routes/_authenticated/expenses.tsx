import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"

type Expense = {
  id: number,
  title: string,
  amount: string,
  date: string
}

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses
})

async function getAllExpenses() {
  const res = await api.expenses.$get()
  if(!res.ok) {
    throw new Error("server error")
  }
  const data = await res.json()
  return data 
}

function Expenses() {
  const { isPending, error, data } = useQuery({ queryKey: ['get-all-expenses'], queryFn: getAllExpenses })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Expense</TableHead>
            <TableHead>Amount</TableHead>
            {/* <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
          ? Array(3).fill(0).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className='h-4' /></TableCell>
              <TableCell><Skeleton className='h-4' /></TableCell>
              <TableCell><Skeleton className='h-4' /></TableCell>
            </TableRow>
          ))
          : data?.expenses.map((expense: Expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.id}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.date.split("T")[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
