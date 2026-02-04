import { useState, FormEvent, useRef } from 'react'
import type { Deck, Slide } from '../types/deck'

/** ค่าเริ่มต้นฟอร์ม (highlights เก็บเป็น string สำหรับ textarea) */
const initialForm = {
  projectName: '',
  objective: '',
  highlights: '',
  companyInfo: '',
  presentationMinutes: '',
}

type FormState = typeof initialForm

const GENERATING_DELAY_MS = 2000

/** คลาสสไตล์ shadcn-like (ธีม Winitch) */
const inputClass =
  'w-full rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-winitch-500/20 focus:border-winitch-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
const labelClass =
  'block font-thai font-medium text-sm text-slate-700 dark:text-slate-300 mb-1.5'
const hintClass = 'mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-thai'

export interface PitchFormProps {
  onDeckCreated?: (deck: Deck) => void
}

export function PitchForm({ onDeckCreated }: PitchFormProps) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [torFile, setTorFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGenerating, setShowGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleFile = (files: FileList | null) => {
    const f = files?.[0]
    setTorFile(f ?? null)
    setError(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFile(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

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
      <div className="card-base rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8">
        {/* Hero — ตรงกับเว็บอ้างอิง */}
        <div className="text-center mb-8">
          <h1 className="font-thai font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            PitchDeck Generator
          </h1>
          <p className="mt-1 text-sm font-medium text-winitch-600 dark:text-winitch-400">
            Powered by AI
          </p>
          <p className="mt-3 font-thai text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            แปลความต้องการ TOR เพื่อให้คุณสามารถสร้างบทนำเสนอที่ชนะใจทุกครั้ง
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* เวลาที่ใช้ในการนำเสนอ (นาที) — ตรงอ้างอิง */}
          <div>
            <label htmlFor="presentationMinutes" className={labelClass}>
              เวลาที่ใช้ในการนำเสนอ (นาที) <span className="text-red-500">*</span>
            </label>
            <input
              id="presentationMinutes"
              type="text"
              inputMode="numeric"
              value={form.presentationMinutes}
              onChange={(e) => update('presentationMinutes', e.target.value)}
              placeholder="เช่น 15"
              className={inputClass}
              disabled={isSubmitting}
            />
          </div>

          {/* อัปโหลดเอกสาร TOR — box สวยงาม แบบ drag & drop */}
          <div>
            <label id="torFileLabel" className={labelClass}>
              อัปโหลดเอกสาร TOR <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              id="torFile"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="sr-only"
              disabled={isSubmitting}
              onChange={(e) => handleFile(e.target.files)}
              aria-labelledby="torFileLabel"
            />
            <button
              type="button"
              aria-label="อัปโหลดเอกสาร TOR"
              title="คลิกหรือลากไฟล์มาวาง"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              disabled={isSubmitting}
              className={`
                w-full min-h-[120px] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 px-4 py-6
                transition-colors cursor-pointer
                ${isDragOver
                  ? 'border-winitch-500 bg-winitch-50 dark:bg-winitch-950/30'
                  : 'border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }
                disabled:opacity-60 disabled:cursor-not-allowed
              `}
            >
              {torFile ? (
                <>
                  <span className="font-thai text-sm font-medium text-winitch-600 dark:text-winitch-400">
                    {torFile.name}
                  </span>
                  <span className="font-thai text-xs text-slate-500 dark:text-slate-400">
                    คลิกหรือลากไฟล์ใหม่เพื่อเปลี่ยน
                  </span>
                </>
              ) : (
                <>
                  <span className="font-thai text-sm text-slate-600 dark:text-slate-400">
                    คลิกเพื่ออัปโหลด หรือลากไฟล์มาวางที่นี่
                  </span>
                  <span className="font-thai text-xs text-slate-400 dark:text-slate-500">
                    รองรับไฟล์: .pdf, .doc, .docx
                  </span>
                </>
              )}
            </button>
            <p className={hintClass}>อัปโหลดเอกสาร TOR เพื่อใช้ฟีเจอร์ AI</p>
          </div>

          {/* ชื่อโปรเจกต์ / ความต้องการของลูกค้า */}
          <div>
            <label htmlFor="projectName" className={labelClass}>
              ชื่อโปรเจกต์ / ความต้องการของลูกค้า <span className="text-red-500">*</span>
            </label>
            <input
              id="projectName"
              type="text"
              value={form.projectName}
              onChange={(e) => update('projectName', e.target.value)}
              placeholder="เช่น My Startup MVP"
              className={inputClass}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="objective" className={labelClass}>
              วัตถุประสงค์
            </label>
            <textarea
              id="objective"
              value={form.objective}
              onChange={(e) => update('objective', e.target.value)}
              placeholder="อธิบายเป้าหมายของ pitch / โปรเจกต์"
              rows={3}
              className={`${inputClass} resize-y min-h-[80px]`}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="highlights" className={labelClass}>
              จุดเด่น
            </label>
            <textarea
              id="highlights"
              value={form.highlights}
              onChange={(e) => update('highlights', e.target.value)}
              placeholder="หนึ่งบรรทัดต่อหนึ่งจุด&#10;เช่น&#10;• เทคโนโลยีล้ำสมัย&#10;• ทีมแข็งแกร่ง"
              rows={4}
              className={`${inputClass} resize-y min-h-[100px]`}
              disabled={isSubmitting}
            />
            <p className={hintClass}>กรอกทีละบรรทัด</p>
          </div>

          <div>
            <label htmlFor="companyInfo" className={labelClass}>
              ข้อมูลบริษัท / ข้อมูล Note ที่ Sales ได้มาจากลูกค้า
            </label>
            <textarea
              id="companyInfo"
              value={form.companyInfo}
              onChange={(e) => update('companyInfo', e.target.value)}
              placeholder="ชื่อบริษัท ประวัติ สถานที่ ติดต่อ ฯลฯ"
              rows={3}
              className={`${inputClass} resize-y min-h-[80px]`}
              disabled={isSubmitting}
            />
            <p className={hintClass}>
              ข้อมูลนี้จะช่วยให้เราสร้าง Pitch Deck ที่ตรงกับความต้องการของลูกค้ามากที่สุด
            </p>
          </div>

          {error && (
            <div
              className="rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-red-700 dark:text-red-300 text-sm font-thai"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full sm:w-auto min-w-[200px] py-3 rounded-md bg-winitch-600 hover:bg-winitch-700 text-white font-medium text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-winitch-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'กำลังสร้าง Deck…' : 'สร้าง Pitch Deck'}
            </button>
            <p className="mt-3 font-thai text-xs text-slate-500 dark:text-slate-400">
              ระบบจะวิเคราะห์ข้อมูลและสร้างสไลด์นำเสนอที่เหมาะสมภายในไม่กี่นาที
            </p>
            <p className="mt-1 font-thai text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <span aria-hidden>💡</span> ระบบจะรักษาความลับของข้อมูลทั้งหมดตามมาตรฐานสากล
            </p>
          </div>
        </form>

        {showGenerating && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            role="status"
            aria-live="polite"
          >
            <div className="card-base rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-6 shadow-xl">
              <p className="font-thai font-medium text-slate-800 dark:text-slate-200">
                กำลังสร้าง Pitch Deck...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
