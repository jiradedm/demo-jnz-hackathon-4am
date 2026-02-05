import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { Home } from './components/Home'
import { PitchForm } from './components/PitchForm'
import { DeckViewer } from './components/DeckViewer'
import { SettingsPage } from './components/Settings'
import { TemplatesPage } from './components/Templates'

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* TanStack Router Devtools could be added here if needed */}
    </>
  ),
})

// Index route (Home)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Form route
const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form',
  component: FormComponent,
})

function FormComponent() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-6 sm:p-8">
      <PitchForm
        onDeckCreated={() => navigate({ to: '/slide' })}
        onSaveDraft={() => navigate({ to: '/' })}
        onBack={() => navigate({ to: '/' })}
      />
    </div>
  )
}

// Slide route
const slideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/slide',
  component: SlideComponent,
})

function SlideComponent() {
  const navigate = useNavigate()
  return <DeckViewer onClose={() => navigate({ to: '/' })} />
}

// Settings route
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
})

// Templates route
const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/templates',
  component: TemplatesPage,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  formRoute,
  slideRoute,
  settingsRoute,
  templatesRoute,
])

// Create the router instance
export const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
