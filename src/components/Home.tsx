import { useNavigate } from '@tanstack/react-router'
import { Plus, Clock, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { DashboardLayout } from './DashboardLayout'

// Mock Data
const RECENT_DECKS = [
  {
    id: 'deck-1',
    title: 'Winitch Investor Pitch',
    subtitle: 'Series A Funding Round',
    updatedAt: '10 mins ago',
    slideCount: 12,
    status: 'Generated',
    thumbnail:
      'bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/30 dark:to-indigo-950/30',
  },
  {
    id: 'deck-2',
    title: 'GovTech Bidding Proposal',
    subtitle: 'Ministry of Digital Economy',
    updatedAt: '2 days ago',
    slideCount: 8,
    status: 'Generated',
    thumbnail:
      'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/30 dark:to-cyan-950/30',
  },
  {
    id: 'deck-3',
    title: 'Q1 Strategy Update',
    subtitle: 'Internal All-Hands',
    updatedAt: '5 days ago',
    slideCount: 15,
    status: 'Generated',
    thumbnail:
      'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30',
  },
  {
    id: 'deck-4',
    title: 'Product Roadmap 2025',
    subtitle: 'Q2 Planning',
    updatedAt: '1 week ago',
    slideCount: 24,
    status: 'Draft',
    thumbnail:
      'bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30',
  },
]

export function Home() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      {/* Recent Decks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-thai">
              My Deck
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-thai">
              จัดการและติดตามสถานะงานนำเสนอของคุณ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Create New Card */}
          <button
            onClick={() => navigate({ to: '/form' })}
            className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent p-6 hover:border-winitch-500 hover:bg-winitch-50/50 dark:hover:border-winitch-500/50 dark:hover:bg-winitch-950/20 transition-all duration-200 h-[280px]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-winitch-100 dark:group-hover:bg-winitch-900/50 transition-colors">
              <Plus className="h-8 w-8 text-slate-400 group-hover:text-winitch-600 dark:group-hover:text-winitch-400" />
            </div>
            <h3 className="font-thai font-semibold text-slate-900 dark:text-white group-hover:text-winitch-700 dark:group-hover:text-winitch-300">
              Create New Deck
            </h3>
            <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400 font-thai max-w-[140px]">
              เริ่มสร้างงานนำเสนอใหม่จาก AI หรือ Template
            </p>
          </button>

          {RECENT_DECKS.map((deck) => (
            <Card
              key={deck.id}
              className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg border-slate-200 dark:border-slate-800 cursor-pointer h-[280px] flex flex-col"
              onClick={() =>
                navigate({ to: deck.status === 'Draft' ? '/form' : '/slide' })
              }
            >
              {/* Thumbnail */}
              <div
                className={cn('relative h-32 w-full shrink-0', deck.thumbnail)}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[1px]">
                  <Button
                    size="sm"
                    className="font-thai bg-white text-slate-900 hover:bg-slate-100 shadow-md"
                  >
                    View Deck
                  </Button>
                </div>
                <div className="absolute right-2 top-2">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm shadow-sm',
                      deck.status === 'Generated'
                        ? 'text-teal-600'
                        : 'text-slate-600'
                    )}
                  >
                    {deck.status}
                  </span>
                </div>
              </div>

              <CardContent className="flex-1 flex flex-col p-4 pt-4">
                <div className="flex-1">
                  <h3 className="font-thai font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-winitch-600 transition-colors">
                    {deck.title}
                  </h3>
                  <p className="font-thai text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {deck.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-thai">
                    <Clock className="w-3.5 h-3.5" />
                    {deck.updatedAt}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <LayoutGrid className="w-3 h-3" />
                      {deck.slideCount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
