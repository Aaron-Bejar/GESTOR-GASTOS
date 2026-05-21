import { useCallback, useEffect, useRef, useState } from 'react'
import { ChatMessages } from './ChatMessages.jsx'
import { ChatInput } from './ChatInput.jsx'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { useChatsQuery } from '../../../hook/useChatsQuery.js'
import { useAuth } from '../../../hook/useAuth.js'
import { buscarContextoIa } from '../../../services/buscarContextoIa.js'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export function ChatDashboard() {
  const { user } = useAuth();
  const { chats, insertarMensajes, isSending } = useChatsQuery();
  const [draft, setDraft] = useState('')
  const [streamingMessage, setStreamingMessage] = useState('');
  const scrollRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (chats.length > 0) scrollToBottom()
  }, [chats, scrollToBottom])

  /*AQUI PROCESAMOS EL ENVÍO DE MENSAJES ENTRE EL USUARIO Y LA IA*/
  async function handleSend() {
    const text = draft.trim()
    if (!text || !user?.id) return

    setDraft('')
    setStreamingMessage('...');

    try {
      // 1. Crear el mensaje del usuario para persistir
      const userMsg = {
        usuario_id: user.id,
        role: 'user',
        content: text
      }

      // 2. BUSCAR CONTEXTO usando tu función optimizada de Supabase
      const contextoFinanciero = await buscarContextoIa(text);

      // 3. Inicializar el modelo de chat rápido de Gemini
      const modelChat = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 4. Diseñar el Prompt del Sistema
      const promptDelSistema = `
        Eres un asistente de finanzas personales inteligente, empático y preciso. 
        Tu objetivo es ayudar al usuario a entender su comportamiento financiero.
        A continuación tienes una lista de los movimientos reales del usuario extraídos de su base de datos que son relevantes para su pregunta actual. Úsalos como única verdad para responder:
        
        [CONTEXTO HISTÓRICO DEL USUARIO]
        ${contextoFinanciero}
        
        Responde la pregunta del usuario basándote de forma clara y concisa en el contexto anterior. Si te pregunta algo que no está en el contexto o no tienes datos suficientes, sé honesto y dile amablemente que no tienes registro de ello en sus movimientos guardados.
      `;

      // 5. Generar la respuesta con la IA
      const resultStream = await modelChat.generateContentStream([promptDelSistema, text]);

      let respuestaCompleta = '';
      setStreamingMessage(''); // Limpiamos el "..."

      for await (const chunk of resultStream.stream) {
        const chunkText = chunk.text();
        respuestaCompleta += chunkText;
        setStreamingMessage(respuestaCompleta); // Actualiza la pantalla en tiempo real
      }

      // 6. Crear el mensaje de la IA para persistir
      const aiMsg = {
        usuario_id: user.id,
        role: 'assistant',
        content: respuestaCompleta
      }

      // 7. Guardar el par de mensajes en Supabase mediante TanStack Query
      insertarMensajes([userMsg, aiMsg]);
      setStreamingMessage('');// Limpiamos el temporal, React Query ya pintará el definitivo

    } catch (error) {
      console.error("Error en el flujo del asistente:", error);
    }
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-linear-to-b from-bg-primary to-bg-secondary font-sans text-foreground antialiased ">
      <ChatMessages
        messages={streamingMessage ? [...chats, { id: 'stream', role: 'assistant', content: streamingMessage }] : chats}
        scrollRef={scrollRef}
      />
      <ChatInput
        value={draft}
        onChange={setDraft}
        onSend={handleSend}
        disabled={isSending}
        placeholder={isSending ? "El asistente está analizando tus finanzas..." : "Pregunta sobre finanzas, presupuesto o movimientos…"}
      />
    </div>
  )
}