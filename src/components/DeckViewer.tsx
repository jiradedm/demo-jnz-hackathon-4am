import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {
  Sparkles,
  AlertCircle,
  Lightbulb,
  GitBranch,
  TrendingUp,
  Rocket,
  CircleDollarSign,
  MessageCircle,
  Heart,
  ListChecks,
  LayoutGrid,
  Download,
  Loader2,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import { MOCK_PITCH_DECK, type MockSlideContent } from '../libs/mockDeck'
import { DeckChat } from './DeckChat'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

/** ไอคอนตาม layout (และ keyword ใน title สำหรับ section) */
function getSlideIcon(slide: MockSlideContent): LucideIcon {
  if (slide.layout === 'title') return Sparkles
  if (slide.layout === 'closing') return Heart
  if (slide.layout === 'bullet') return ListChecks
  if (slide.layout === 'two-column') return LayoutGrid
  if (slide.layout === 'section') {
    const t = slide.title.toLowerCase()
    if (t.includes('challenge') || t.includes('problem')) return AlertCircle
    if (t.includes('solution') || t.includes('winitch')) return Lightbulb
    if (t.includes('how it works') || t.includes('work')) return GitBranch
    if (t.includes('market')) return TrendingUp
    if (t.includes('traction') || t.includes('why')) return Rocket
    if (t.includes('ask') || t.includes('seed')) return CircleDollarSign
    if (t.includes('call') || t.includes('action')) return MessageCircle
    return Lightbulb
  }
  return LayoutGrid
}

/** กรอบสไลด์ — แถบบน + หมายเลขมุมล่างขวา */
function SlideFrame({
  slide,
  slideIndex,
  total,
  children,
  noFrame,
}: {
  slide: MockSlideContent
  slideIndex: number
  total: number
  children: React.ReactNode
  noFrame?: boolean
}) {
  if (noFrame) return <>{children}</>
  const Icon = getSlideIcon(slide)
  return (
    <div className="relative flex flex-col min-h-full w-full overflow-hidden bg-white dark:bg-slate-900">
      {/* Title bar แบบ PowerPoint */}
      <div className="flex-shrink-0 flex items-center gap-2 px-5 py-2 border-b border-slate-200/80 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/50">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-winitch-600 to-winitch-700 text-white">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
        <span className="font-thai text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
          Winitch Pitch Deck
        </span>
      </div>
      <div className="flex-1 flex flex-col min-h-0 relative">
        {children}
        {/* มุมตกแต่ง */}
        <div className="absolute bottom-0 right-0 w-24 h-12 bg-gradient-to-tl from-winitch-500/10 to-transparent pointer-events-none rounded-tl-full" />
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-victory-500/5 to-transparent pointer-events-none rounded-br-full" />
        {/* หมายเลข slide มุมล่างขวา */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 font-thai text-xs text-slate-400 dark:text-slate-500">
          <span>{slideIndex + 1}</span>
          <span>/</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  )
}

/** Render เนื้อหาตาม layout ของแต่ละ slide */
function SlideContent({
  slide,
  slideIndex,
  total,
}: {
  slide: MockSlideContent
  slideIndex: number
  total: number
}) {
  const Icon = getSlideIcon(slide)
  const frame = (node: React.ReactNode, noFrame?: boolean) => (
    <SlideFrame
      slide={slide}
      slideIndex={slideIndex}
      total={total}
      noFrame={noFrame}
    >
      {node}
    </SlideFrame>
  )

  switch (slide.layout) {
    case 'title': {
      return frame(
        <div className="relative flex flex-col items-center justify-center flex-1 w-full text-center px-10 py-12 overflow-hidden">
          <div className="absolute inset-0 slide-bg-title slide-bg-pattern opacity-40" />
          <div className="dark:opacity-80 absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-winitch-50/50 dark:to-winitch-950/30" />
          <div className="absolute top-8 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-winitch-500 to-transparent" />
          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-winitch-600 to-winitch-800 text-white shadow-xl shadow-winitch-500/25 ring-4 ring-winitch-200/60 dark:ring-winitch-900/50">
                <Sparkles className="h-10 w-10" strokeWidth={2} />
              </div>
            </div>
            <h1 className="font-thai font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white mb-5 drop-shadow-sm">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="font-thai text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
            )}
          </div>
        </div>
      )
    }
    case 'section': {
      return frame(
        <div className="flex flex-1 min-h-0 w-full">
          <div className="w-1.5 flex-shrink-0 rounded-full bg-gradient-to-b from-winitch-500 to-winitch-700 mx-6 my-8" />
          <div className="flex flex-1 flex-col justify-center py-8 pr-12 overflow-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-winitch-500/15 text-winitch-600 dark:text-winitch-400">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h2 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {slide.title}
              </h2>
            </div>
            <div className="mb-6 h-1 w-12 rounded-full bg-winitch-500/80" />
            {slide.subtitle && (
              <p className="font-thai text-base text-slate-600 dark:text-slate-400 mb-6 max-w-xl">
                {slide.subtitle}
              </p>
            )}
            {slide.bullets && (
              <ul className="space-y-4 font-thai">
                {slide.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/50 px-4 py-3 shadow-sm"
                  >
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-victory-500/15 text-victory-600 dark:text-victory-400 text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 pt-0.5">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )
    }
    case 'bullet': {
      return frame(
        <div className="flex flex-1 flex-col items-center justify-center w-full px-10 py-8 overflow-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-winitch-500/15 text-winitch-600 dark:text-winitch-400">
              <ListChecks className="h-7 w-7" strokeWidth={2} />
            </div>
            <h2 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white text-center">
              {slide.title}
            </h2>
          </div>
          {slide.bullets && (
            <div className="flex w-full max-w-2xl flex-col gap-4">
              {slide.bullets.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 rounded-2xl border border-winitch-200/80 dark:border-winitch-800 bg-gradient-to-r from-winitch-50/80 to-white dark:from-winitch-950/40 dark:to-slate-900/80 px-5 py-4 shadow-sm"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-winitch-600 to-winitch-700 text-sm font-bold text-white shadow">
                    {i + 1}
                  </span>
                  <span className="font-thai text-slate-700 dark:text-slate-200 text-lg">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }
    case 'two-column': {
      return frame(
        <div className="flex flex-1 flex-col justify-center w-full px-10 py-8 overflow-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-winitch-500/15 text-winitch-600 dark:text-winitch-400">
              <LayoutGrid className="h-6 w-6" strokeWidth={2} />
            </div>
            <h2 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white text-center">
              {slide.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-winitch-200 dark:border-winitch-800 bg-gradient-to-br from-winitch-50 to-winitch-100/50 dark:from-winitch-950/50 dark:to-winitch-900/30 p-6 shadow-md shadow-winitch-200/30 dark:shadow-winitch-950/50">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-winitch-500/20 text-winitch-600 dark:text-winitch-400 font-bold text-sm">
                1
              </div>
              <p className="font-thai text-slate-700 dark:text-slate-200 leading-relaxed">
                {slide.left}
              </p>
            </div>
            <div className="rounded-2xl border border-victory-500/30 dark:border-victory-500/40 bg-gradient-to-br from-victory-500/10 to-victory-500/5 dark:from-victory-500/20 dark:to-victory-500/10 p-6 shadow-md">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-victory-500/25 text-victory-600 dark:text-victory-400 font-bold text-sm">
                2
              </div>
              <p className="font-thai text-slate-700 dark:text-slate-200 leading-relaxed">
                {slide.right}
              </p>
            </div>
          </div>
        </div>
      )
    }
    case 'closing': {
      return frame(
        <div className="relative flex flex-1 flex-col items-center justify-center w-full text-center px-10 py-12 overflow-hidden">
          <div
            className="absolute inset-0 opacity-50 dark:opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgb(124 58 237 / 0.15), transparent), linear-gradient(180deg, transparent 0%, rgb(245 243 255 / 0.8) 100%)',
            }}
          />
          <div className="dark:opacity-70 absolute inset-0 bg-gradient-to-t from-winitch-100/60 dark:from-winitch-950/40 to-transparent" />
          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-victory-500/20 text-victory-600 dark:text-victory-400">
                <Heart className="h-8 w-8" strokeWidth={2} />
              </div>
            </div>
            <h2 className="font-thai font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="font-thai text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8">
                {slide.subtitle}
              </p>
            )}
            <div className="inline-flex items-center gap-2 rounded-full border border-winitch-200 dark:border-winitch-800 bg-white/80 dark:bg-slate-900/80 px-5 py-2.5 shadow-sm">
              <span className="gradient-text font-thai font-bold text-xl">
                Winitch by Jenosize
              </span>
            </div>
          </div>
        </div>
      )
    }
    default: {
      return frame(
        <div className="flex flex-1 flex-col items-center justify-center w-full px-12 py-10 overflow-auto">
          <div className="flex items-start gap-4 w-full max-w-xl">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-winitch-500/15 text-winitch-600 dark:text-winitch-400">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="border-l-4 border-winitch-500 pl-6">
              <h2 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="font-thai text-lg text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )
    }
  }
}

interface DeckViewerProps {
  onClose?: () => void
}

/**
 * Deck Viewer — แสดง pitch deck เป็นชุด slide มีลำดับ นำทางดูได้ (prev/next, pagination, keyboard).
 * ใช้ mock data จาก libs/mockDeck (front-end only).
 */
type ExportStatus = 'idle' | 'exporting' | 'success'

export function DeckViewer({ onClose }: DeckViewerProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle')
  const deckWinrate = 95
  const deckAnalysis = `จากการประเมินศักยภาพล่าสุด Winitch มีโอกาสระดมทุนสำเร็จ (Win Rate) สูงถึง 95% จัดอยู่ในสถานะ "Must-Invest Deal" ที่หาได้ยากในตลาด โดยปัจจัยขับเคลื่อนหลักคือ Value Proposition ที่สร้างผลกระทบในระดับปฏิวัติวงการ (Disruptive Impact) การลดกระบวนการทำงานจาก "5 วันเหลือ 5 นาที" ถือเป็น Efficiency Leap ที่สร้าง ROI ให้นักลงทุนเห็นได้ทันที ผนวกกับเทคโนโลยี Agentic AI ที่มีความแม่นยำสูงและผ่านการ Validate ตลาดด้วย Traction จริงจากผู้นำอุตสาหกรรม ทำให้ความเสี่ยงในการลงทุนต่ำมาก

จุดเด่นที่ทำให้ Winitch เหนือกว่าคู่แข่งอย่างขาดลอยคือการวางตำแหน่งเป็น Strategic Partner ที่มี Context Awareness เฉพาะทาง ซึ่งเป็นจุดที่ AI ทั่วไปเลียนแบบได้ยาก (High Barrier to Entry) ถือเป็นโปรเจกต์ที่มี Product-Market Fit สมบูรณ์แบบและพร้อมสำหรับการ Scale สู่ตลาด GovTech ระดับโลกอย่างแท้จริง`

  const handleFakeExport = () => {
    setExportStatus('exporting')
    window.setTimeout(() => {
      setExportStatus('success')
      window.setTimeout(() => setExportStatus('idle'), 2500)
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-100 dark:bg-[var(--color-dark-bg)]">
      {/* Header — Winrate (วิเคราะห์ทั้ง deck) + Popover วิเคราะห์จาก AI */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-gradient-to-br from-winitch-600 to-winitch-800 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            W
          </div>
          <div>
            <h1 className="font-thai font-bold text-lg text-foreground">
              Winitch
            </h1>
            <p className="text-xs text-muted-foreground">
              Slide {activeIndex + 1} / {MOCK_PITCH_DECK.length}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-winitch-200 dark:border-winitch-700 bg-winitch-50 dark:bg-winitch-950/80 px-3 py-2 font-thai text-sm font-medium text-winitch-700 dark:text-winitch-300 hover:bg-winitch-100 dark:hover:bg-winitch-900/80 transition-colors"
                title="วิเคราะห์ทั้ง deck จาก AI"
              >
                <span className="opacity-80">Winrate</span>
                <span className="font-bold tabular-nums">{deckWinrate}%</span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <div className="border-b border-border px-4 py-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-winitch-500/15">
                  <Sparkles className="h-4 w-4 text-winitch-600 dark:text-winitch-400" />
                </div>
                <span className="font-thai font-semibold text-sm text-foreground">
                  วิเคราะห์จาก AI
                </span>
              </div>
              <div className="px-4 py-3 max-h-[280px] overflow-auto">
                <p className="font-thai text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {deckAnalysis}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-2">
          {exportStatus === 'success' ? (
            <span className="flex items-center gap-1.5 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/80 px-3 py-2 font-thai text-sm font-medium text-green-700 dark:text-green-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Export สำเร็จ
            </span>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handleFakeExport}
              disabled={exportStatus === 'exporting'}
              className="font-thai gap-2"
            >
              {exportStatus === 'exporting' ? (
                <>
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                  กำลัง export...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 shrink-0" />
                  Export
                </>
              )}
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Slide ก่อนหน้า"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={activeIndex === 0}
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Slide ถัดไป"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={activeIndex === MOCK_PITCH_DECK.length - 1}
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="font-thai"
            >
              ปิด
            </Button>
          )}
        </div>
      </header>

      {/* Main: Deck (ซ้าย) + Chat (ขวา) แบบ Cursor */}
      <div className="flex-1 flex min-h-0">
        {/* Deck + pagination */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            <Card
              className={cn(
                'w-full aspect-video overflow-hidden shadow-xl border-2 border-slate-200/80 dark:border-slate-700',
                'max-w-6xl 2xl:max-w-7xl'
              )}
            >
              <Swiper
                modules={[Pagination, Keyboard]}
                spaceBetween={0}
                slidesPerView={1}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                className="h-full w-full [--swiper-pagination-bottom:0.75rem]"
              >
                {MOCK_PITCH_DECK.map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <div className="h-full w-full flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
                      <SlideContent
                        slide={slide}
                        slideIndex={index}
                        total={MOCK_PITCH_DECK.length}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Card>
          </div>
          <div className="flex-shrink-0 px-4 py-2 flex flex-wrap justify-center gap-1.5 border-t border-border bg-muted/50">
            {MOCK_PITCH_DECK.map((_, i) => (
              <Button
                key={i}
                type="button"
                variant={i === activeIndex ? 'default' : 'outline'}
                size="icon"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/x-deck-slide', String(i))
                  e.dataTransfer.effectAllowed = 'copy'
                }}
                onClick={() => swiperRef.current?.slideTo(i)}
                className={cn(
                  'size-8 cursor-grab active:cursor-grabbing',
                  i === activeIndex && 'bg-primary text-primary-foreground'
                )}
                aria-label={`ไป slide ${i + 1} — ลากไปวางในแชทเป็น context ได้`}
                aria-current={i === activeIndex ? 'true' : undefined}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
        {/* Chat panel (ความกว้างคงที่) — รับ drop เลข slide เป็น context */}
        <div className="w-[380px] flex-shrink-0 flex flex-col min-h-0 max-h-full">
          <DeckChat totalSlides={MOCK_PITCH_DECK.length} />
        </div>
      </div>
    </div>
  )
}
