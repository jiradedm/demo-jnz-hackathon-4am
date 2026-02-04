import { useState, FormEvent } from 'react'
import {
  Upload,
  FileText,
  CheckCircle,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Save,
  PieChart,
  Target,
  DollarSign,
} from 'lucide-react'
import type { Deck, Slide } from '../types/deck'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

/** Mock: ข้อมูลที่ AI สกัดจาก TOR (ใช้เมื่อ mock อัปโหลด) — Winitch ตาม Brand CI */
const mockAIData = {
  projectName: 'Winitch (The Winning Intelligence Engine)',
  oneLiner:
    'Decode the TOR. Design the Win. — เปลี่ยนเอกสาร TOR ที่ซับซ้อนให้เป็น Pitch Deck ผู้ชนะด้วย Agentic AI',
  problem:
    'การทำ Proposal จาก TOR มีความซับซ้อนสูง (Complex Requirements) ใช้เวลานานในการแกะ Requirement (Time-consuming) และเสี่ยงต่อการตีความผิดพลาด ทำให้เสียโอกาสทางธุรกิจมหาศาล',
  solution:
    'Agentic AI Core ที่ทำหน้าที่เป็น Strategic Partner ช่วยอ่าน TOR เชิงลึก สกัด Insight และสร้างโครงสร้าง Pitch Deck ที่ Professional & Sharp โดยอัตโนมัติ',
  targetAudience:
    'B2G Contractors, System Integrators (SI), Agency และ Business Development Teams ที่ต้องยื่นซองประมูลภาครัฐและเอกชน',
  marketSize:
    'ตลาด Government Technology (GovTech) และ Procurement Software ระดับโลก มูลค่า 4 แสนล้านดอลลาร์ และตลาด AI Productivity ที่เติบโต 40% ต่อปี',
  competitors:
    'การจ้าง Consultant ราคาแพง (ช้าและควบคุมยาก), General AI อย่าง ChatGPT (ขาด Context Awareness เรื่อง TOR), หรือการทำ Manual Process แบบเดิม',
  businessModel:
    '1. Subscription Tier (Pro/Enterprise) สำหรับบริษัท SI\n2. Success Fee สำหรับโครงการมูลค่าสูง\n3. Pay-per-bid สำหรับผู้ใช้งานทั่วไป',
  traction:
    'Pilot Test กับบริษัท SI ชั้นนำ 3 แห่ง, ลดเวลาเตรียม Deck จาก 5 วันเหลือ 5 นาที, ความแม่นยำในการตีความ TOR 98% (The Sage Precision)',
  fundingAsk: '20,000,000 THB (Seed Round)',
  useOfFunds:
    '60% พัฒนา Agentic AI Core (Deep Tech), 25% Market Expansion & B2G Partnership, 15% Operations & Team Growth',
}

const initialForm = {
  projectName: '',
  oneLiner: '',
  problem: '',
  solution: '',
  targetAudience: '',
  marketSize: '',
  competitors: '',
  businessModel: '',
  traction: '',
  fundingAsk: '',
  useOfFunds: '',
}

type FormState = typeof initialForm

const TOR_ANALYZE_DELAY_MS = 2000
const GENERATING_DELAY_MS = 2000
const hintClass = 'mt-1.5 text-xs text-muted-foreground font-thai'

export interface PitchFormProps {
  onDeckCreated?: (deck: Deck) => void
}

export function PitchForm({ onDeckCreated }: PitchFormProps) {
  const [fileName, setFileName] = useState('')
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [form, setForm] = useState<FormState>(initialForm)
  const [presentationMinutes, setPresentationMinutes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGenerating, setShowGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  /** ฟิลด์ที่ผู้ใช้แก้แล้ว (ไม่แสดง tag AI Generated) */
  const [userEditedFields, setUserEditedFields] = useState<Set<keyof FormState>>(
    () => new Set()
  )

  const showAITag = (field: keyof FormState) =>
    isAnalyzed && !userEditedFields.has(field)

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setUserEditedFields((prev) => new Set(prev).add(field))
    setError(null)
  }

  /** Mock: คลิกช่องอัปโหลด = จำลอง AI วิเคราะห์ TOR แล้วเติมฟอร์ม */
  const runAnalyzeMock = () => {
    if (isAnalyzed || isAnalyzing) return
    setIsAnalyzing(true)
    setError(null)
    setTimeout(() => {
      setFileName('Winitch_Strategic_Plan_TOR.pdf')
      setForm(mockAIData as FormState)
      setUserEditedFields(new Set())
      setIsAnalyzed(true)
      setIsAnalyzing(false)
    }, TOR_ANALYZE_DELAY_MS)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    runAnalyzeMock()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

  const resetTor = () => {
    setFileName('')
    setIsAnalyzed(false)
    setForm(initialForm)
    setUserEditedFields(new Set())
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    setShowGenerating(true)

    setTimeout(() => {
      const deckId = `deck-${Date.now()}`
      const highlights = [form.problem, form.solution, form.traction].filter(
        Boolean
      )
      const companyInfo = [
        form.targetAudience,
        form.marketSize,
        form.competitors,
        form.businessModel,
        `Funding: ${form.fundingAsk}`,
        form.useOfFunds,
      ]
        .filter(Boolean)
        .join('\n\n')

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
          content: form.oneLiner.trim() || '—',
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
          content: companyInfo || '—',
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
    <div className="w-full max-w-4xl mx-auto">
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
          <p className="mt-1 text-sm font-medium text-primary">
            The Winning Intelligence Engine
          </p>
          <p className="mt-3 font-thai text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            วิเคราะห์เอกสาร TOR เพื่อให้ AI เติมข้อมูลให้ จากนั้นแก้ไขและสร้าง
            Pitch Deck
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ขั้นตอนที่ 1: อัปโหลด TOR (อยู่ก่อน input อื่น) */}
            <div className="space-y-2">
              <Label className="font-thai">
                วิเคราะห์เอกสาร TOR <span className="text-destructive">*</span>
              </Label>
              <div
                role="button"
                tabIndex={0}
                onClick={runAnalyzeMock}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    runAnalyzeMock()
                  }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  'relative rounded-xl border-2 border-dashed min-h-[140px] flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer',
                  'border-input bg-card hover:bg-accent/50',
                  isDragOver && 'border-primary bg-primary/10',
                  isAnalyzed && 'border-victory-500/50 bg-victory-500/5'
                )}
              >
                {!isAnalyzed ? (
                  isAnalyzing ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <Sparkles className="w-10 h-10 text-primary mb-2 animate-pulse" />
                      <p className="font-thai text-sm font-medium text-primary">
                        กำลังวิเคราะห์เอกสาร TOR...
                      </p>
                      <p className="font-thai text-xs text-muted-foreground">
                        AI กำลังสกัด Pain Point และ Scope งาน
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-thai text-sm font-medium text-foreground">
                        คลิกเพื่อวิเคราะห์ TOR (Mock)
                      </span>
                      <span className="font-thai text-xs text-muted-foreground">
                        หรือลากมาวางที่นี่
                      </span>
                    </>
                  )
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-4 w-full px-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-victory-500/20 p-2 rounded-lg">
                        <FileText className="w-6 h-6 text-victory-500" />
                      </div>
                      <div className="text-left">
                        <p className="font-thai font-medium text-foreground flex items-center gap-2">
                          {fileName}
                          <span className="px-2 py-0.5 bg-victory-500/20 text-victory-600 dark:text-victory-400 text-xs rounded-full font-medium">
                            Analyzed
                          </span>
                        </p>
                        <p className="font-thai text-xs text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-victory-500" />{' '}
                          ดึงข้อมูลสำเร็จ: 11 หัวข้อ
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="font-thai text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        resetTor()
                      }}
                    >
                      วิเคราะห์ใหม่
                    </Button>
                  </div>
                )}
              </div>
              <p className={hintClass}>
                คลิกหรือลากมาวางเพื่อเริ่มวิเคราะห์ (Mock)
                ระบบจะเติมฟิลด์ด้านล่างให้
              </p>
            </div>

            {/* ฟอร์มที่ AI เติม (แสดงหลังวิเคราะห์ TOR) */}
            <div
              className={cn(
                'transition-all duration-500 space-y-6',
                !isAnalyzed &&
                  'opacity-50 pointer-events-none select-none translate-y-2'
              )}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="font-thai font-bold text-lg text-foreground">
                  ข้อมูลที่ AI แนะนำ (แก้ไขได้)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Identity */}
                <div className="md:col-span-2 card-base p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-thai font-semibold text-foreground">
                      Project Identity
                    </h3>
                  </div>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="projectName"
                        className="font-thai label-base flex items-center justify-between"
                      >
                        ชื่อโครงการ / Startup Name
                        {showAITag('projectName') && (
                          <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded">
                            AI Generated
                          </span>
                        )}
                      </Label>
                      <Input
                        id="projectName"
                        name="projectName"
                        value={form.projectName}
                        onChange={(e) => update('projectName', e.target.value)}
                        disabled={isSubmitting}
                        className="font-thai"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="oneLiner"
                        className="font-thai label-base flex items-center justify-between"
                      >
                        One-Liner / Elevator Pitch
                        {showAITag('oneLiner') && (
                          <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded">
                            AI Generated
                          </span>
                        )}
                      </Label>
                      <Input
                        id="oneLiner"
                        name="oneLiner"
                        value={form.oneLiner}
                        onChange={(e) => update('oneLiner', e.target.value)}
                        disabled={isSubmitting}
                        className="font-thai"
                      />
                    </div>
                  </div>
                </div>

                {/* Problem */}
                <div className="card-base p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <h3 className="font-thai font-semibold text-foreground">
                      Problem (Pain Point)
                    </h3>
                    {showAITag('problem') && (
                      <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded ml-auto">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <Textarea
                    id="problem"
                    name="problem"
                    rows={5}
                    value={form.problem}
                    onChange={(e) => update('problem', e.target.value)}
                    disabled={isSubmitting}
                    className="font-thai min-h-[100px] resize-none"
                  />
                  <p className={hintClass}>
                    *ดึงจากส่วน "ที่มาและความสำคัญ" ใน TOR
                  </p>
                </div>

                {/* Solution */}
                <div className="card-base p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <CheckCircle className="w-5 h-5 text-victory-500" />
                    <h3 className="font-thai font-semibold text-foreground">
                      Solution (Our Tech)
                    </h3>
                    {showAITag('solution') && (
                      <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded ml-auto">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <Textarea
                    id="solution"
                    name="solution"
                    rows={5}
                    value={form.solution}
                    onChange={(e) => update('solution', e.target.value)}
                    disabled={isSubmitting}
                    className="font-thai min-h-[100px] resize-none"
                  />
                  <p className={hintClass}>
                    *สรุปจาก "ขอบเขตของงาน (Scope of Work)"
                  </p>
                </div>

                {/* Market & Opportunity */}
                <div className="md:col-span-2 card-base p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    <h3 className="font-thai font-semibold text-foreground">
                      Market & Opportunity
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="targetAudience"
                        className="font-thai label-base flex items-center justify-between"
                      >
                        Target Audience
                        {showAITag('targetAudience') && (
                          <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded">
                            AI Generated
                          </span>
                        )}
                      </Label>
                      <Input
                        id="targetAudience"
                        name="targetAudience"
                        value={form.targetAudience}
                        onChange={(e) =>
                          update('targetAudience', e.target.value)
                        }
                        disabled={isSubmitting}
                        className="font-thai"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="marketSize"
                        className="font-thai label-base flex items-center justify-between"
                      >
                        Market Size (TAM/SAM)
                        {showAITag('marketSize') && (
                          <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded">
                            AI Generated
                          </span>
                        )}
                      </Label>
                      <Input
                        id="marketSize"
                        name="marketSize"
                        value={form.marketSize}
                        onChange={(e) => update('marketSize', e.target.value)}
                        disabled={isSubmitting}
                        className="font-thai"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label
                        htmlFor="competitors"
                        className="font-thai label-base flex items-center justify-between"
                      >
                        Competitors / Alternatives
                        {showAITag('competitors') && (
                          <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded">
                            AI Generated
                          </span>
                        )}
                      </Label>
                      <Input
                        id="competitors"
                        name="competitors"
                        value={form.competitors}
                        onChange={(e) => update('competitors', e.target.value)}
                        disabled={isSubmitting}
                        className="font-thai"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Model */}
                <div className="md:col-span-2 card-base p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h3 className="font-thai font-semibold text-foreground">
                      Business Model
                    </h3>
                    {showAITag('businessModel') && (
                      <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded ml-auto">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <Textarea
                    id="businessModel"
                    name="businessModel"
                    rows={3}
                    value={form.businessModel}
                    onChange={(e) => update('businessModel', e.target.value)}
                    disabled={isSubmitting}
                    className="font-thai min-h-[72px] resize-none"
                  />
                </div>

                {/* Traction */}
                <div className="card-base p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <ChevronRight className="w-5 h-5 text-primary" />
                    <h3 className="font-thai font-semibold text-foreground">
                      Traction & Progress
                    </h3>
                    {showAITag('traction') && (
                      <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded ml-auto">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <Textarea
                    id="traction"
                    name="traction"
                    rows={4}
                    value={form.traction}
                    onChange={(e) => update('traction', e.target.value)}
                    disabled={isSubmitting}
                    className="font-thai min-h-[80px] resize-none"
                  />
                  <p className={hintClass}>
                    *จากส่วน "คุณสมบัติผู้ยื่นข้อเสนอ/ผลงาน"
                  </p>
                </div>

                {/* Funding Ask */}
                <div className="card-base p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <DollarSign className="w-5 h-5 text-victory-500" />
                    <h3 className="font-thai font-semibold text-foreground">
                      Funding Ask
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="fundingAsk"
                      className="font-thai label-base flex items-center justify-between"
                    >
                      จำนวนเงินที่ต้องการ (อิงจากราคากลาง)
                      {showAITag('fundingAsk') && (
                        <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded">
                          AI Generated
                        </span>
                      )}
                    </Label>
                    <Input
                      id="fundingAsk"
                      name="fundingAsk"
                      value={form.fundingAsk}
                      onChange={(e) => update('fundingAsk', e.target.value)}
                      disabled={isSubmitting}
                      className="font-thai font-semibold text-victory-600 dark:text-victory-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="useOfFunds"
                      className="font-thai label-base flex items-center justify-between"
                    >
                      แผนการใช้เงิน (Use of Funds)
                      {showAITag('useOfFunds') && (
                        <span className="text-xs text-primary font-normal bg-primary/10 px-2 py-0.5 rounded">
                          AI Generated
                        </span>
                      )}
                    </Label>
                    <Textarea
                      id="useOfFunds"
                      name="useOfFunds"
                      rows={2}
                      value={form.useOfFunds}
                      onChange={(e) => update('useOfFunds', e.target.value)}
                      disabled={isSubmitting}
                      className="font-thai min-h-[60px] resize-none"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div
                  className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-destructive text-sm font-thai"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  className="font-thai"
                >
                  <Save className="w-4 h-4" /> Save Draft
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isAnalyzed}
                  className="font-thai min-w-[200px]"
                  size="lg"
                >
                  สร้าง Pitch Deck <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
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
