import { useState, FormEvent, useRef } from 'react'
import type { Deck, Slide } from '../types/deck'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

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

const hintClass = 'mt-1.5 text-xs text-muted-foreground font-thai'

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
      <Card className="p-6 sm:p-8">
        <CardHeader className="p-0 text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-winitch-600 to-winitch-800 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-winitch-500/30 shrink-0">
              W
            </div>
            <h1 className="font-thai font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
              Winitch
            </h1>
          </div>
          <p className="mt-1 text-sm font-medium text-primary">The Winning Intelligence Engine</p>
          <p className="mt-3 font-thai text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            แปลความต้องการ TOR เพื่อให้คุณสามารถสร้างบทนำเสนอที่ชนะใจทุกครั้ง
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="presentationMinutes" className="font-thai">
                เวลาที่ใช้ในการนำเสนอ (นาที){' '}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="presentationMinutes"
                type="text"
                inputMode="numeric"
                value={form.presentationMinutes}
                onChange={(e) => update('presentationMinutes', e.target.value)}
                placeholder="เช่น 15"
                disabled={isSubmitting}
                className="font-thai"
              />
            </div>

            <div className="space-y-2">
              <Label id="torFileLabel" htmlFor="torFile" className="font-thai">
                อัปโหลดเอกสาร TOR <span className="text-destructive">*</span>
              </Label>
              <input
                title="อัปโหลดเอกสาร TOR"
                placeholder="คลิกหรือลากไฟล์มาวาง"
                ref={fileInputRef}
                id="torFile"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="sr-only"
                disabled={isSubmitting}
                onChange={(e) => handleFile(e.target.files)}
                aria-labelledby="torFileLabel"
              />
              <Button
                type="button"
                variant="outline"
                aria-label="อัปโหลดเอกสาร TOR"
                title="คลิกหรือลากไฟล์มาวาง"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                disabled={isSubmitting}
                className={cn(
                  'w-full min-h-[120px] flex flex-col items-center justify-center gap-2 border-2 border-dashed font-normal',
                  isDragOver && 'border-primary bg-primary/10'
                )}
              >
                {torFile ? (
                  <>
                    <span className="font-thai text-sm font-medium text-primary">
                      {torFile.name}
                    </span>
                    <span className="font-thai text-xs text-muted-foreground">
                      คลิกหรือลากไฟล์ใหม่เพื่อเปลี่ยน
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-thai text-sm text-muted-foreground">
                      คลิกเพื่ออัปโหลด หรือลากไฟล์มาวางที่นี่
                    </span>
                    <span className="font-thai text-xs text-muted-foreground/80">
                      รองรับไฟล์: .pdf, .doc, .docx
                    </span>
                  </>
                )}
              </Button>
              <p className={hintClass}>อัปโหลดเอกสาร TOR เพื่อใช้ฟีเจอร์ AI</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName" className="font-thai">
                ชื่อโปรเจกต์ / ความต้องการของลูกค้า{' '}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="projectName"
                type="text"
                value={form.projectName}
                onChange={(e) => update('projectName', e.target.value)}
                placeholder="เช่น My Startup MVP"
                disabled={isSubmitting}
                className="font-thai"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective" className="font-thai">
                วัตถุประสงค์
              </Label>
              <Textarea
                id="objective"
                value={form.objective}
                onChange={(e) => update('objective', e.target.value)}
                placeholder="อธิบายเป้าหมายของ pitch / โปรเจกต์"
                rows={3}
                disabled={isSubmitting}
                className="font-thai min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlights" className="font-thai">
                จุดเด่น
              </Label>
              <Textarea
                id="highlights"
                value={form.highlights}
                onChange={(e) => update('highlights', e.target.value)}
                placeholder={
                  'หนึ่งบรรทัดต่อหนึ่งจุด\nเช่น\n• เทคโนโลยีล้ำสมัย\n• ทีมแข็งแกร่ง'
                }
                rows={4}
                disabled={isSubmitting}
                className="font-thai min-h-[100px]"
              />
              <p className={hintClass}>กรอกทีละบรรทัด</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyInfo" className="font-thai">
                ข้อมูลบริษัท / ข้อมูล Note ที่ Sales ได้มาจากลูกค้า
              </Label>
              <Textarea
                id="companyInfo"
                value={form.companyInfo}
                onChange={(e) => update('companyInfo', e.target.value)}
                placeholder="ชื่อบริษัท ประวัติ สถานที่ ติดต่อ ฯลฯ"
                rows={3}
                disabled={isSubmitting}
                className="font-thai min-h-[80px]"
              />
              <p className={hintClass}>
                ข้อมูลนี้จะช่วยให้เราสร้าง Pitch Deck
                ที่ตรงกับความต้องการของลูกค้ามากที่สุด
              </p>
            </div>

            {error && (
              <div
                className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-destructive text-sm font-thai"
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px] font-thai"
                size="lg"
              >
                {isSubmitting ? 'กำลังสร้าง Deck…' : 'สร้าง Pitch Deck'}
              </Button>
              <p className="font-thai text-xs text-muted-foreground">
                ระบบจะวิเคราะห์ข้อมูลและสร้างสไลด์นำเสนอที่เหมาะสมภายในไม่กี่นาที
              </p>
              <p className="font-thai text-xs text-muted-foreground/80 flex items-center gap-1">
                <span aria-hidden>💡</span>{' '}
                ระบบจะรักษาความลับของข้อมูลทั้งหมดตามมาตรฐานสากล
              </p>
            </div>
          </form>
        </CardContent>

        {showGenerating && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            role="status"
            aria-live="polite"
          >
            <Card className="px-8 py-6 shadow-xl">
              <p className="font-thai font-medium text-foreground">
                กำลังสร้าง Pitch Deck...
              </p>
            </Card>
          </div>
        )}
      </Card>
    </div>
  )
}
