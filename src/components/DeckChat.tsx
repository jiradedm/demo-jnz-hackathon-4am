import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type MessageRole = 'user' | 'assistant'

interface Message {
  id: string
  role: MessageRole
  content: string
  /** แสดงเฉพาะตอน assistant กำลัง "คิด" (ก่อนได้ response จริง) */
  isThinking?: boolean
}

const DRAG_TYPE_SLIDE = 'application/x-deck-slide'
const THINKING_DURATION_MS = 2000
const FAKE_THINKING_STEPS = [
  'กำลังวิเคราะห์ pitch deck...',
  'กำลังสรุปประเด็นสำคัญ...',
  'กำลังสร้างคำตอบ...',
]

/**
 * Fake AI response หลัง thinking (demo only)
 */
function getFakeResponse(_prompt: string): string {
  return 'นี่คือคำตอบตัวอย่างจาก AI ตาม prompt ที่คุณส่งมา (demo — ไม่ได้เชื่อม API จริง). คุณสามารถปรับปรุง slide นี้ได้โดยเน้น value proposition ให้ชัดขึ้น หรือเพิ่มข้อมูลตลาดและตัวเลขสนับสนุน.'
}

export interface DeckChatProps {
  totalSlides?: number
}

export function DeckChat({ totalSlides }: DeckChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [contextSlideIndices, setContextSlideIndices] = useState<number[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const listEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () =>
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleDragOver = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes(DRAG_TYPE_SLIDE)) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
      setIsDragOver(true)
    }
  }

  const handleDragLeave = () => setIsDragOver(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const raw = e.dataTransfer.getData(DRAG_TYPE_SLIDE)
    if (raw === '') return
    const index = parseInt(raw, 10)
    if (Number.isNaN(index) || index < 0) return
    if (totalSlides != null && index >= totalSlides) return
    setContextSlideIndices((prev) =>
      prev.includes(index) ? prev : [...prev, index].sort((a, b) => a - b)
    )
  }

  const removeContextSlide = (index: number) => {
    setContextSlideIndices((prev) => prev.filter((i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isThinking) return

    const contextLabel =
      contextSlideIndices.length > 0
        ? `[อ้างอิง Slide ${contextSlideIndices.map((i) => i + 1).join(', ')}] `
        : ''
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: contextLabel + trimmed,
    }
    setContextSlideIndices([])
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsThinking(true)

    // ใส่ placeholder message สำหรับ "thinking" แล้วค่อยอัปเดตเป็น response จริง
    const thinkingId = `thinking-${Date.now()}`
    setMessages((prev) => [
      ...prev,
      {
        id: thinkingId,
        role: 'assistant',
        content: FAKE_THINKING_STEPS[0],
        isThinking: true,
      },
    ])

    let stepIndex = 0
    const stepInterval = setInterval(() => {
      stepIndex += 1
      if (stepIndex < FAKE_THINKING_STEPS.length) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === thinkingId
              ? { ...m, content: FAKE_THINKING_STEPS[stepIndex] }
              : m
          )
        )
      }
    }, THINKING_DURATION_MS / FAKE_THINKING_STEPS.length)

    setTimeout(() => {
      clearInterval(stepInterval)
      const responseText = getFakeResponse(trimmed)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === thinkingId
            ? {
                ...m,
                content: responseText,
                isThinking: false,
              }
            : m
        )
      )
      setIsThinking(false)
    }, THINKING_DURATION_MS)
  }

  return (
    <div
      className={`flex h-full flex-col bg-slate-50 dark:bg-slate-900/80 border-l border-slate-200 dark:border-slate-700 transition-colors ${
        isDragOver
          ? 'ring-2 ring-winitch-500 ring-inset bg-winitch-50/50 dark:bg-winitch-950/30'
          : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Chat header — shadcn */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
        <div className="size-8 rounded-md bg-gradient-to-br from-winitch-600 to-winitch-800 flex items-center justify-center text-white text-sm font-bold shadow-sm">
          W
        </div>
        <span className="font-thai font-medium text-sm text-foreground">
          AI Assistant
        </span>
      </div>

      {/* Messages (drop zone) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <p className="font-thai text-slate-500 dark:text-slate-400 text-sm">
              ส่ง prompt เกี่ยวกับ pitch deck ได้เลย หรือลากเลข slide
              ด้านล่างมาวางเป็น context
            </p>
            <p className="font-thai text-slate-400 dark:text-slate-500 text-xs mt-2">
              "สรุป slide นี้ให้หน่อย" หรือ "แนะนำวิธีปรับปรุง"
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2.5 border ${
                msg.role === 'user'
                  ? 'bg-winitch-600 text-white border-winitch-700'
                  : msg.isThinking
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 shadow-sm'
              }`}
            >
              {msg.isThinking && (
                <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse mr-2 align-middle" />
              )}
              <span className="font-thai text-sm whitespace-pre-wrap break-words">
                {msg.content}
              </span>
            </div>
          </div>
        ))}
        <div ref={listEndRef} />
      </div>

      {/* Context chips (จาก drop เลข slide) */}
      {contextSlideIndices.length > 0 && (
        <div className="flex-shrink-0 px-4 pb-2 flex flex-wrap gap-2">
          <span className="font-thai text-xs text-slate-500 dark:text-slate-400 self-center">
            Context:
          </span>
          {contextSlideIndices.map((i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-md border border-winitch-200 dark:border-winitch-800 bg-winitch-50 dark:bg-winitch-950/50 text-winitch-700 dark:text-winitch-300 px-3 py-1 font-thai text-sm"
            >
              Slide {i + 1}
              <button
                type="button"
                onClick={() => removeContextSlide(i)}
                className="rounded-full p-0.5 hover:bg-winitch-200 dark:hover:bg-winitch-800 text-current"
                aria-label={`เอา Slide ${i + 1} ออกจาก context`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input — shadcn Input + Button */}
      <form
        onSubmit={handleSubmit}
        className="flex-shrink-0 p-4 border-t border-border bg-card"
      >
        <div className="flex gap-2 rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-background overflow-hidden">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ต้องการปรับปรุงอะไร?"
            disabled={isThinking}
            className="flex-1 min-w-0 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 font-thai"
            aria-label="Prompt สำหรับ AI"
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={!input.trim() || isThinking}
            className="font-thai text-primary hover:bg-primary/10 shrink-0"
            aria-label="ส่ง prompt"
          >
            ส่ง
          </Button>
        </div>
      </form>
    </div>
  )
}
