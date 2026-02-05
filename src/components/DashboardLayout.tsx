import {
  LayoutGrid,
  Settings,
  Search,
  Bell,
  LogOut,
  FolderOpen,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const normalizedPath = (
      path === '/' ? base || '/' : `${base}${path}`
    ).replace(/\/$/, '')
    const currentPath = location.pathname.replace(/\/$/, '') || '/'
    return currentPath === normalizedPath
  }

  return (
    <div className="flex h-screen w-full bg-slate-50/50 dark:bg-[#020617]">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 md:flex">
        <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate({ to: '/' })}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-winitch-600 to-winitch-800 text-white font-bold shadow-lg shadow-winitch-500/20">
              W
            </div>
            <span className="font-thai text-lg font-bold text-slate-900 dark:text-white">
              Winitch
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-auto py-6 px-4">
          <nav className="space-y-1">
            <Button
              variant={isActive('/') ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3 font-thai font-medium',
                isActive('/') ? '' : 'text-slate-600 dark:text-slate-400'
              )}
              size="lg"
              onClick={() => navigate({ to: '/' })}
            >
              <LayoutGrid className="h-4 w-4" />
              My Decks
            </Button>
            <Button
              variant={isActive('/templates') ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3 font-thai font-medium',
                isActive('/templates')
                  ? ''
                  : 'text-slate-600 dark:text-slate-400'
              )}
              size="lg"
              onClick={() => navigate({ to: '/templates' })}
            >
              <FolderOpen className="h-4 w-4" />
              Templates
            </Button>
            {/* <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-thai text-slate-600 dark:text-slate-400 font-medium"
              size="lg"
            >
              <Users className="h-4 w-4" />
              Team
            </Button> */}
            <Button
              variant={isActive('/settings') ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3 font-thai font-medium',
                isActive('/settings')
                  ? ''
                  : 'text-slate-600 dark:text-slate-400'
              )}
              size="lg"
              onClick={() => navigate({ to: '/settings' })}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
              <span className="font-bold text-slate-600 dark:text-slate-300">
                JS
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white font-thai">
                Jenosize User
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400 font-thai">
                user@jenosize.com
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-6 sm:px-8">
          <div className="flex flex-1 items-center gap-4 md:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-slate-50 dark:bg-slate-800 pl-9 font-thai border-slate-200 dark:border-slate-700 focus-visible:ring-winitch-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
            <Button
              onClick={() => navigate({ to: '/form' })}
              className="font-thai gap-2 bg-winitch-600 hover:bg-winitch-700 shadow-lg shadow-winitch-500/20"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Deck</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 sm:p-8">
          <div className="mx-auto max-w-6xl space-y-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
