import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { PitchForm } from './components/PitchForm'
import { DeckViewer } from './components/DeckViewer'

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* TanStack Router Devtools could be added here if needed */}
    </>
  ),
})

// Create an index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
})

function IndexComponent() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-6 sm:p-8">
      <PitchForm onDeckCreated={() => navigate({ to: '/slide' })} />
    </div>
  )
}

// Create a slide route
const slideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/slide',
  component: SlideComponent,
})

function SlideComponent() {
  const navigate = useNavigate()
  return <DeckViewer onClose={() => navigate({ to: '/' })} />
}

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, slideRoute])

// Create the router instance
export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
