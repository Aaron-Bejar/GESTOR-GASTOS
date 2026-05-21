function RobotIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full max-h-full max-w-full drop-shadow-lg"
      aria-hidden
    >
      <defs>
        <linearGradient id="robot-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--bg-azul2)" />
          <stop offset="100%" stopColor="var(--bg-azul1)" />
        </linearGradient>
        <linearGradient id="robot-face" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--bg-quarters)" />
          <stop offset="100%" stopColor="var(--bg-tertiary)" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="52" ry="10" fill="var(--bg-azul3)" opacity="0.35" />
      <rect x="58" y="72" width="84" height="88" rx="22" fill="url(#robot-body)" />
      <rect x="72" y="88" width="56" height="44" rx="12" fill="url(#robot-face)" />
      <circle cx="88" cy="108" r="7" fill="var(--foreground)" opacity="0.85" />
      <circle cx="112" cy="108" r="7" fill="var(--foreground)" opacity="0.85" />
      <circle cx="90" cy="106" r="2.5" fill="var(--bg-primary)" />
      <circle cx="114" cy="106" r="2.5" fill="var(--bg-primary)" />
      <path
        d="M 90 122 Q 100 132 110 122"
        fill="none"
        stroke="var(--bg-azul2)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="44" y="92" width="18" height="36" rx="9" fill="var(--bg-azul3)" />
      <rect x="138" y="92" width="18" height="36" rx="9" fill="var(--bg-azul3)" />
      <rect x="78" y="48" width="44" height="32" rx="14" fill="url(#robot-body)" />
      <circle cx="100" cy="58" r="5" fill="var(--bg-purpuraElec)" opacity="0.9" />
      <path d="M 92 42 L 100 30 L 108 42 Z" fill="var(--bg-azul2)" />
    </svg>
  )
}

export function ChatWelcome() {
  return (
    <div className="flex h-full min-h-0 w-full max-w-3xl flex-col items-center justify-center px-4 py-8 overflow-y-auto">
      <article className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-borde-ui bg-bg-secondary/80 px-6 py-5 md:py-10 text-center shadow-popover backdrop-blur-sm sm:px-10">
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-borde-ui bg-linear-to-br from-bg-quarters to-bg-tertiary shadow-card">
          <RobotIllustration />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Tu Asistente Financiero Virtual
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gris sm:text-base">
          Hola, soy tu asistente especializado en{' '}
          <span className="font-medium text-foreground">finanzas personales</span>. Estoy aquí para
          ayudarte con presupuestos, ahorros y el análisis de tus movimientos
          financieros.
        </p>
        <p className="mt-3 rounded-2xl border border-borde-ui bg-bg-tertiary/60 px-4 py-3 text-sm leading-relaxed text-foreground">
          Importante:{' '}
          <span className="font-medium text-bg-azul2">
            solo responderé y daré consejos sobre temas financieros
          </span>
          . Para cualquier otra consulta, te pediré que reformules tu pregunta dentro de este
          ámbito.
        </p>
        <p className="mt-6 text-sm text-gris">
          Escribe tu primera pregunta abajo para comenzar.
        </p>
      </article>
    </div>
  )
}
