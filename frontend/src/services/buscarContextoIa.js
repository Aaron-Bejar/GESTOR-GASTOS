import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../supabase/cliente';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

const SIN_RESULTADOS = "No se encontraron movimientos financieros históricos relacionados con esta consulta.";
const ERROR_CONTEXTO = "Error al recuperar el historial financiero.";

export const buscarContextoIa = async (
    preguntaUsuario,
    { threshold = 0.3, matchCount = 7 } = {}
) => {
    if (!preguntaUsuario?.trim()) {
        return SIN_RESULTADOS;
    }

    try {
        // 1. Mismo modelo que obtenerEmbedding
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

        // 2. Mismo formato simple de texto
        const result = await model.embedContent(preguntaUsuario);
        const vectorPregunta = result.embedding.values;

        // 3. Buscar en Supabase
        const { data: filasContexto, error } = await supabase.rpc('buscar_contexto_ia', {
            query_embedding: vectorPregunta,
            similarity_threshold: threshold,
            match_count: matchCount
        });

        if (error) throw error;

        if (!filasContexto || filasContexto.length === 0) {
            return SIN_RESULTADOS;
        }

        return filasContexto.map(m => `- ${m.datos_legibles}`).join('\n');

    } catch (error) {
        console.error("Error obteniendo contexto para el asistente:", error);
        return ERROR_CONTEXTO;
    }
};