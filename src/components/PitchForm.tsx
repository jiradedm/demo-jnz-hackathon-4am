import { useState, FormEvent } from 'react'
import type { Deck, Slide } from '../types/deck'

/** ค่าเริ่มต้นฟอร์ม (highlights เก็บเป็น string สำหรับ textarea) */
const initialForm = {
  projectName: '',
  objective: '',
  highlights: '',
  companyInfo: '',
}

type FormState = typeof initialForm

const GENERATING_DELAY_MS = 2000

export interface PitchFormProps {
  onDeckCreated?: (deck: Deck) => void
}

export function PitchForm({ onDeckCreated }: PitchFormProps) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGenerating, setShowGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    setShowGenerating(true)

    setTimeout(() => {
      const deckId = `deck-${Date.now()}`
      const highlights = form.highlights
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)

      const slides: Slide[] = [
        {
          id: `${deckId}-1`,
          deckId,
          order: 1,
          content: form.projectName.trim() || 'Pitch Deck',
          layout: 'title',
        },
        {
          id: `${deckId}-2`,
          deckId,
          order: 2,
          content: form.objective.trim() || '—',
          layout: 'section',
        },
        ...highlights.map(
          (text, i) =>
            ({
              id: `${deckId}-h-${i}`,
              deckId,
              order: 3 + i,
              content: text,
              layout: 'bullet',
            }) as Slide
        ),
        {
          id: `${deckId}-company`,
          deckId,
          order: 3 + highlights.length,
          content: form.companyInfo.trim() || '—',
          layout: 'section',
        },
      ]

      const mockDeck: Deck = {
        id: deckId,
        title: form.projectName.trim() || undefined,
        slides,
      }

      setShowGenerating(false)
      setIsSubmitting(false)
      onDeckCreated?.(mockDeck)
    }, GENERATING_DELAY_MS)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-card rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-winitch-600 to-winitch-800 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-winitch-500/30">
            W
          </div>
          <div>
            <h1 className="font-thai font-bold text-xl text-slate-900 dark:text-white">
              Winitch
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              สร้าง Pitch Deck
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="projectName"
              className="block font-thai font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              ชื่อโปรเจกต์
            </label>
            <input
              id="projectName"
              type="text"
              value={form.projectName}
              onChange={(e) => update('projectName', e.target.value)}
              placeholder="เช่น My Startup MVP"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-winitch-500 focus:border-transparent transition"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="objective"
              className="block font-thai font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              วัตถุประสงค์
            </label>
            <textarea
              id="objective"
              value={form.objective}
              onChange={(e) => update('objective', e.target.value)}
              placeholder="อธิบายเป้าหมายของ pitch / โปรเจกต์"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-winitch-500 focus:border-transparent transition resize-y min-h-[80px]"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="highlights"
              className="block font-thai font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              จุดเด่น
            </label>
            <textarea
              id="highlights"
              value={form.highlights}
              onChange={(e) => update('highlights', e.target.value)}
              placeholder="หนึ่งบรรทัดต่อหนึ่งจุด&#10;เช่น&#10;• เทคโนโลยีล้ำสมัย&#10;• ทีมแข็งแกร่ง"
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-winitch-500 focus:border-transparent transition resize-y min-h-[100px]"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              กรอกทีละบรรทัด
            </p>
          </div>

          <div>
            <label
              htmlFor="companyInfo"
              className="block font-thai font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              ข้อมูลบริษัท
            </label>
            <textarea
              id="companyInfo"
              value={form.companyInfo}
              onChange={(e) => update('companyInfo', e.target.value)}
              placeholder="ชื่อบริษัท ประวัติ สถานที่ ติดต่อ ฯลฯ"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-winitch-500 focus:border-transparent transition resize-y min-h-[80px]"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div
              className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-5 py-3 rounded-xl font-medium bg-gradient-to-r from-winitch-600 to-winitch-700 text-white shadow-lg shadow-winitch-500/30 hover:from-winitch-500 hover:to-winitch-600 focus:outline-none focus:ring-2 focus:ring-winitch-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? 'กำลังสร้าง Deck…' : 'สร้าง Deck'}
            </button>
          </div>
        </form>

        {showGenerating && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            role="status"
            aria-live="polite"
          >
            <div className="glass-card rounded-2xl px-8 py-6 shadow-2xl">
              <p className="font-thai font-medium text-slate-800 dark:text-slate-200">
                Generating...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
