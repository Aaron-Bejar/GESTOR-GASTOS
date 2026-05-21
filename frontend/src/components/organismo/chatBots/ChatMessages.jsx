import { ChatWelcome } from './ChatWelcome.jsx'
import ReactMarkdown from 'react-markdown'

function IconSparkles() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.2 4.2L17 7l-3.8 1.8L12 13l-1.2-4.2L7 7l3.8-1.8L12 2zm7 8l.8 2.8L22 13l-2.5 1.2L19 17l-1.2-2.5L15 13l2.5-1.2L19 10zm-14 0l2.5-1.2L11 5l1.2 2.5L15 10l-2.5 1.2L11 15l-1.2-2.5L5 10z" />
    </svg>
  )
}

export function ChatMessages({ messages, scrollRef }) {
  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-1 min-h-0 justify-center overflow-hidden px-4">
      {isEmpty ? (
        <ChatWelcome />
      ) : (
        <div
          ref={scrollRef}
          className="flex h-full w-full max-w-3xl flex-col overflow-x-hidden overflow-y-auto scroll-smooth py-5 pb-6"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          <div className="flex flex-col gap-5">
            {messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="flex w-full min-w-0 justify-end">
                  <div className="min-w-0 max-w-[85%] break-words rounded-2xl rounded-br-md border border-borde-ui bg-bg-tertiary px-4 py-3.5 text-sm leading-relaxed whitespace-pre-wrap text-foreground shadow-card">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex w-full min-w-0 max-w-full gap-3 self-start">
                  <div
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-borde-ui bg-linear-to-br from-bg-azul1 to-bg-azul2 text-white shadow-button"
                    title="Asistente financiero"
                  >
                    <IconSparkles />
                  </div>
                  <div className="min-w-0 max-w-[85%] break-words rounded-2xl rounded-bl-md border border-borde-ui bg-bg-secondary px-4 py-3.5 text-sm leading-relaxed text-foreground shadow-card">
                    <ReactMarkdown
                      components={{
                        p: ({ ...props }) => <span className="block leading-relaxed" {...props} />,
                        ul: ({ ...props }) => <ul className="m-0 pl-4 list-disc" {...props} />,
                        li: ({ ...props }) => <li className="m-0" {...props} />
                      }}
                    >{m.content.trim()}</ReactMarkdown>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
