import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'

import { useForm } from '@tanstack/react-form'
import { api } from '@/lib/api'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense
})

function CreateExpense() {
  const navigate = useNavigate()
  
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({json: value })
      if(!res.ok) {
        throw new Error('error adding new expense')
      }
      navigate({to:'/expenses'})
    },
  })

  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <h1>Create Expense</h1>
      <form className='max-w-xl m-auto' 
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
        
        <form.Field
          name="title"
          /* validators={{
            onChange: ({ value }) =>
              !value
                ? 'A first name is required'
                : value.length < 3
                  ? 'First name must be at least 3 characters'
                  : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              return (
                value.includes('error') &&
                'No "error" allowed in first name'
              )
            },
          }} */
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          }
        />
        <form.Field
          name="amount"
          /* validators={{
            onChange: ({ value }) =>
              !value
                ? 'A first name is required'
                : value.length < 3
                  ? 'First name must be at least 3 characters'
                  : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              return (
                value.includes('error') &&
                'No "error" allowed in first name'
              )
            },
          }} */
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          }
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className='mt-4' disabled={!canSubmit}>
              {isSubmitting ? 'Submitting Expense' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}