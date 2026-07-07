import { useCallback, useEffect, useRef, useState } from 'react'
import { ChatMessages } from './ChatMessages.jsx'
import { ChatInput } from './ChatInput.jsx'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { useChatsQuery } from '../../../hook/useChatsQuery.js'
import { useAuth } from '../../../hook/useAuth.js'
import { buscarContextoIa } from '../../../services/buscarContextoIa.js'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// Movido fuera del componente: no depende de nada del render salvo el contexto,
// que se interpola en el momento del envío.
const construirPromptSistema = (contextoFinanciero) => `
  Eres un asistente de finanzas personales inteligente, empático y preciso.
  Tu objetivo es ayudar al usuario a entender su comportamiento financiero.
  A continuación tienes una lista de los movimientos reales del usuario extraídos de su base de datos que son relevantes para su pregunta actual. Úsalos como única verdad para responder:

  [CONTEXTO HISTÓRICO DEL USUARIO]
  ${contextoFinanciero}

  Responde la pregunta del usuario basándote de forma clara y concisa en el contexto anterior. Si te pregunta algo que no está en el contexto o no tienes datos suficientes, sé honesto y dile amablemente que no tienes registro de ello en sus movimientos guardados.
`;

export function ChatDashboard() {
  const { user } = useAuth();
  const { chats, insertarMensajes, isSending } = useChatsQuery();
  const [draft, setDraft] = useState('')
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);
  const [pendingUserMsg, setPendingUserMsg] = useState(null);
  const scrollRef = useRef(null)
  const abortControllerRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (chats.length > 0 || pendingUserMsg || streamingMessage) scrollToBottom()
  }, [chats, pendingUserMsg, streamingMessage, scrollToBottom])

  // Cancela cualquier stream en curso si el componente se desmonta
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  /*AQUI PROCESAMOS EL ENVÍO DE MENSAJES ENTRE EL USUARIO Y LA IA*/
  const handleSend = useCallback(async () => {
    const text = draft.trim()
    if (!text || !user?.id || isStreaming) return

    setDraft('')
    setErrorEnvio(null)
    setStreamingMessage('...');
    setIsStreaming(true)

    // 1. Crear el mensaje del usuario para persistir
    const userMsg = {
      usuario_id: user.id,
      role: 'user',
      content: text
    }

    // Lo mostramos de inmediato en pantalla, sin esperar la respuesta de la IA
    // ni el guardado en Supabase. Uso un id temporal para el key de React.
    setPendingUserMsg({ ...userMsg, id: `pending-${Date.now()}` })

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      // 2. BUSCAR CONTEXTO usando tu función optimizada de Supabase
      const contextoFinanciero = await buscarContextoIa(text);

      if (controller.signal.aborted) return

      // 3. Inicializar el modelo de chat rápido de Gemini
      const modelChat = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 4. Armar el prompt del sistema con el contexto recuperado
      const promptDelSistema = construirPromptSistema(contextoFinanciero);

      // 5. Generar la respuesta con la IA
      const resultStream = await modelChat.generateContentStream([promptDelSistema, text]);

      let respuestaCompleta = '';
      setStreamingMessage(''); // Limpiamos el "..."

      for await (const chunk of resultStream.stream) {
        if (controller.signal.aborted) return
        const chunkText = chunk.text();
        respuestaCompleta += chunkText;
        setStreamingMessage(respuestaCompleta); // Actualiza la pantalla en tiempo real
      }

      if (controller.signal.aborted) return

      if (!respuestaCompleta.trim()) {
        throw new Error('El asistente no devolvió contenido.')
      }

      // 6. Crear el mensaje de la IA para persistir
      const aiMsg = {
        usuario_id: user.id,
        role: 'assistant',
        content: respuestaCompleta
      }

      // 7. Guardar el par de mensajes en Supabase mediante TanStack Query
      insertarMensajes([userMsg, aiMsg]);
      setStreamingMessage(''); // Limpiamos el temporal, React Query ya pintará el definitivo
      setPendingUserMsg(null); // el mensaje real ya viene en `chats`

    } catch (error) {
      if (controller.signal.aborted) return
      console.error("Error en el flujo del asistente:", error);
      setStreamingMessage('');
      setPendingUserMsg(null);
      setDraft(text); // devolvemos el mensaje al usuario para que no lo pierda
      setErrorEnvio('No se pudo obtener respuesta del asistente. Intenta de nuevo.')
    } finally {
      if (!controller.signal.aborted) {
        setIsStreaming(false)
      }
      abortControllerRef.current = null
    }
  }, [draft, user, isStreaming, insertarMensajes])

  const mensajesAMostrar = [
    ...chats,
    ...(pendingUserMsg ? [pendingUserMsg] : []),
    ...(streamingMessage ? [{ id: 'stream', role: 'assistant', content: streamingMessage }] : []),
  ]

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-linear-to-b from-bg-primary to-bg-secondary font-sans text-foreground antialiased ">
      <ChatMessages
        messages={mensajesAMostrar}
        scrollRef={scrollRef}
      />
      {errorEnvio && (
        <div className="mx-auto mb-2 w-full max-w-3xl px-4">
          <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-600">
            {errorEnvio}
          </p>
        </div>
      )}
      <ChatInput
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        disabled={isSending || isStreaming}
        placeholder={isSending || isStreaming ? "El asistente está analizando tus finanzas..." : "Pregunta sobre finanzas, presupuesto o movimientos…"}
      />
    </div>
  )
}