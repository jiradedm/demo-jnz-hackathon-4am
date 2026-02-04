import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { MOCK_PITCH_DECK, type MockSlideContent } from '../libs/mockDeck'
import { DeckChat } from './DeckChat'

/** Render เนื้อหาตาม layout ของแต่ละ slide */
function SlideContent({ slide }: { slide: MockSlideContent }) {
  switch (slide.layout) {
    case 'title': {
      return (
        <div className="relative flex flex-col items-center justify-center min-h-full w-full text-center px-10 py-12 overflow-hidden">
          <div className="absolute inset-0 slide-bg-title opacity-40" />
          <div className="dark:opacity-80 absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-winitch-50/50 dark:to-winitch-950/30" />
          <div className="absolute top-8 left-1/2 h-0.5 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-winitch-500 to-transparent" />
          <div className="relative z-10">
            <h1 className="font-thai font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-white mb-5 drop-shadow-sm">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="font-thai text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
            )}
            <div className="mt-10 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-winitch-600 to-winitch-800 text-white font-bold text-2xl shadow-xl shadow-winitch-500/25 ring-4 ring-winitch-200/60 dark:ring-winitch-900/50">
                W
              </div>
            </div>
          </div>
        </div>
      )
    }
    case 'section': {
      return (
        <div className="flex min-h-full w-full">
          <div className="w-1.5 flex-shrink-0 rounded-full bg-gradient-to-b from-winitch-500 to-winitch-700 mx-6 my-8" />
          <div className="flex flex-1 flex-col justify-center py-8 pr-10">
            <h2 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-1">
              {slide.title}
            </h2>
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
      return (
        <div className="flex flex-col items-center justify-center min-h-full w-full px-10 py-10">
          <h2 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-8 text-center">
            {slide.title}
          </h2>
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
      return (
        <div className="flex flex-col justify-center min-h-full w-full px-10 py-8">
          <h2 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-6 text-center">
            {slide.title}
          </h2>
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
      return (
        <div className="relative flex flex-col items-center justify-center min-h-full w-full text-center px-10 py-12 overflow-hidden">
          <div
            className="absolute inset-0 opacity-50 dark:opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgb(124 58 237 / 0.15), transparent), linear-gradient(180deg, transparent 0%, rgb(245 243 255 / 0.8) 100%)',
            }}
          />
          <div className="dark:opacity-70 absolute inset-0 bg-gradient-to-t from-winitch-100/60 dark:from-winitch-950/40 to-transparent" />
          <div className="relative z-10">
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
      return (
        <div className="flex flex-col items-center justify-center min-h-full w-full px-12 py-10">
          <div className="w-full max-w-xl border-l-4 border-winitch-500 pl-6">
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
export function DeckViewer({ onClose }: DeckViewerProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-100 dark:bg-[var(--color-dark-bg)]">
      {/* Header — shadcn-style */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-winitch-600 to-winitch-800 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            W
          </div>
          <div>
            <h1 className="font-thai font-bold text-lg text-slate-900 dark:text-white">
              Pitch Deck
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Slide {activeIndex + 1} / {MOCK_PITCH_DECK.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Slide ก่อนหน้า"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={activeIndex === 0}
            className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <svg
              className="w-5 h-5"
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
          </button>
          <button
            type="button"
            aria-label="Slide ถัดไป"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={activeIndex === MOCK_PITCH_DECK.length - 1}
            className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <svg
              className="w-5 h-5"
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
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              ปิด
            </button>
          )}
        </div>
      </header>

      {/* Main: Deck (ซ้าย) + Chat (ขวา) แบบ Cursor */}
      <div className="flex-1 flex min-h-0">
        {/* Deck + pagination */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            <div className="w-full max-w-4xl aspect-video bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
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
                {MOCK_PITCH_DECK.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="h-full w-full flex items-center justify-center bg-white dark:bg-slate-900">
                      <SlideContent slide={slide} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="flex-shrink-0 px-4 py-2 flex flex-wrap justify-center gap-1.5 border-t border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80">
            {MOCK_PITCH_DECK.map((_, i) => (
              <button
                key={i}
                type="button"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/x-deck-slide', String(i))
                  e.dataTransfer.effectAllowed = 'copy'
                }}
                onClick={() => swiperRef.current?.slideTo(i)}
                className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-medium transition cursor-grab active:cursor-grabbing ${
                  i === activeIndex
                    ? 'bg-winitch-600 text-white shadow-sm border border-winitch-700'
                    : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                aria-label={`ไป slide ${i + 1} — ลากไปวางในแชทเป็น context ได้`}
                aria-current={i === activeIndex ? 'true' : undefined}
              >
                {i + 1}
              </button>
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
