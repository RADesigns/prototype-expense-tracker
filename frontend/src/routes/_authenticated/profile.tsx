import { createFileRoute } from '@tanstack/react-router'

import  { useQueryOptions }  from '@/lib/api'

import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile
})

function Profile() {
  const { isPending, error, data } = useQuery(useQueryOptions)

  if (isPending) return 'Loading...'

  if (error) return 'not logged in'

  return (
    
    <div className="flex flex-col bg-background m-auto max-w-5xl gap-y-5">
      Hello {data.user.given_name}
      <a href="/api/logout">Logout!</a>
    </div>
  )
}

export default Profile