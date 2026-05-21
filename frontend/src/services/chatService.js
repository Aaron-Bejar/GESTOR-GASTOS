import { supabase } from "../supabase/cliente"

// Obtiene todo el historial de mensajes ordenado cronológicamente
export const getChats = async (userId) => {
    const { data, error } = await supabase
        .from('Chats') 
        .select('*')
        .eq('usuario_id', userId)
        .order('create_at', { ascending: true }); // Ordena del más viejo al más nuevo

    if (error) {
        throw error;
    }
    return data || []; // Retorna un array vacío si no hay mensajes
}

// Inserta los mensajes en la base de datos
// pasar un array de objetos (usuario + asistente) pregunta y respuesta , 
// supabase se encargará de separar cada objeto en una fila diferente
export const insertChat = async (newChat) => {
    const { data, error } = await supabase
        .from("Chats")
        .insert(newChat) 
        .select();
        
    if (error) throw error;
    return data;
};
