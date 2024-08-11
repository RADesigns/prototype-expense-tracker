import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

import { db } from '../db'
import { expenses as expensesTable } from '../db/schema/expenses'
import { eq } from 'drizzle-orm'
import { getUser } from '../kinde'



const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    //amount: z.number().int().positive()
    amount: z.string()
})

type Expense = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({id: true})

const fakeExpenses: Expense[] = [
    {id: 1, title: "title 1", amount: "100"},
    {id: 2, title: "title 2", amount: "200"},
    {id: 3, title: "title 3", amount: "300"},
]

export const expensesRoute = new Hono()
.get('/', getUser, async (c) => {
    const user = c.var.user
    const expenses = await db.select().from(expensesTable).where(eq(expensesTable.userId, user.id))

    return c.json({expenses: expenses})
})
.post('/', getUser, zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json")
    const user = c.var.user
    
    const result = await db.insert(expensesTable).values({
        ...expense,
        userId: user.id
    }).returning()
    
    
    c.status(201)
    return c.json(result)
})
.get('/total-spent', (c) => {
    
    const total = fakeExpenses.reduce((acc, expense) => acc + +expense.amount, 0)
    return c.json({total})
})
.get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const expense = fakeExpenses.find(expense => expense.id === id)
    if(!expense) {
        return c.notFound()
    }
    return c.json(expense)
})
.delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const index = fakeExpenses.findIndex(expense => expense.id === id)
    if(index === -1) {
        return c.notFound()
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0]
    return c.json({expense: deletedExpense})
})
//.put