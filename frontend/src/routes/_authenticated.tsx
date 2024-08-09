import {createFileRoute, Outlet } from "@tanstack/react-router"

const Component = () => {
  const { user } = Route.useRouteContext()
  console.log(user)
  if(!user) {
    return <Login />
  }
  
  return <Outlet />
}

function Login() {
  return <h1>You Must Login</h1>
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    //return { user: {name: ""}}
    return {user: null}
  },
  component: Component
})

