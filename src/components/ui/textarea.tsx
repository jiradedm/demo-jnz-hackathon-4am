import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null)

    const setRef = React.useCallback(
      (el: HTMLTextAreaElement | null) => {
        internalRef.current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    const adjustHeight = React.useCallback(() => {
      const el = internalRef.current
      if (!el) return
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }, [])

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight()
        onChange?.(e)
      },
      [onChange, adjustHeight]
    )

    React.useEffect(() => {
      adjustHeight()
    }, [props.value, adjustHeight])

    return (
      <textarea
        className={cn(
          'flex min-h-[2.5rem] max-h-[12rem] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-foreground/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-y-auto',
          className
        )}
        ref={setRef}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
