import { useEffect, useRef, useState } from 'react'

const MIN_HEIGHT = 24
const MAX_HEIGHT = 120
const SINGLE_LINE_HEIGHT = 44

function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

export function ChatInput({ value, onChange, onSend, placeholder = 'Escribe un mensaje…' }) {
  const textareaRef = useRef(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return

    ta.style.height = 'auto'
    const next = Math.min(Math.max(ta.scrollHeight, MIN_HEIGHT), MAX_HEIGHT)
    ta.style.height = `${next}px`
    ta.style.overflowY = ta.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
    setExpanded(next > SINGLE_LINE_HEIGHT || value.includes('\n'))
  }, [value])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="shrink-0 bg-linear-to-t from-bg-primary from-40% to-transparent px-4 pt-3 pb-5">
      <div className="mx-auto w-full max-w-3xl ">
        <div
          className={[
            'flex gap-1.5 rounded-3xl border border-borde-ui bg-bg-tertiary px-2 py-1.5 shadow-lg transition-[border-color,box-shadow] focus-within:border-bg-azul2 focus-within:shadow-focus',
            expanded ? 'items-end' : 'items-center',
          ].join(' ')}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            className="chat-scroll block max-h-[120px] min-h-10 min-w-0 flex-1 resize-none border-0 bg-transparent pl-4 px-0.5 py-2 text-sm leading-relaxed text-foreground outline-none placeholder:text-gris placeholder:truncate placeholder:whitespace-nowrap"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            aria-label="Mensaje para el asistente"
          />
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-bg-azul2 text-white shadow-button transition-colors hover:bg-bg-azul3 disabled:cursor-not-allowed disabled:opacity-45"
            onClick={onSend}
            disabled={!value.trim()}
            aria-label="Enviar mensaje"
            title="Enviar"
          >
            <IconSend />
          </button>
        </div>

        <p className="mt-2 text-center text-sm text-gris ">
          Enter para enviar · Mayús + Enter para nueva línea
        </p>
      </div>
    </div>
  )
}
