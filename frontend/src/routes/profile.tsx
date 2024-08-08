import { createFileRoute } from '@tanstack/react-router'

import  { api }  from '@/lib/api'

import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/profile')({
  component: Profile
})

async function getCurrentUser() {
  const res = await api.me.$get()
  if(!res.ok) {
    throw new Error("server error")
  }
  const data = await res.json()
  return data 
}

function Profile() {
  const { isPending, error, data } = useQuery({ queryKey: ['get-current-user'], queryFn: getCurrentUser })

  if (isPending) return 'Loading...'

  if (error) return 'not logged in'

  return (
    
    <div className="flex flex-col bg-background m-auto max-w-5xl gap-y-5">
      Hello {data.user.given_name}
    </div>
  )
}

export default Profile