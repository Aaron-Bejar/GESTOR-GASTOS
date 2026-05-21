
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../supabase/cliente';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export const buscarContextoIa = async (preguntaUsuario) => {
    try {
        // 1. Mismo modelo que obtenerEmbedding
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

        // 2. Mismo formato simple de texto
        const result = await model.embedContent(preguntaUsuario);
        const vectorPregunta = result.embedding.values;

        // 3. Buscar en Supabase
        const { data: filasContexto, error } = await supabase.rpc('buscar_contexto_ia', {
            query_embedding: vectorPregunta,
            similarity_threshold: 0.3,
            match_count: 7
        });

        if (error) throw error;

        if (!filasContexto || filasContexto.length === 0) {
            return "No se encontraron movimientos financieros históricos relacionados con esta consulta.";
        }

        const contextoFormateado = filasContexto.map(m => `- ${m.datos_legibles}`).join('\n');
        return contextoFormateado;

    } catch (error) {
        console.error("Error obteniendo contexto para el asistente:", error);
        return "Error al recuperar el historial financiero.";
    }
};