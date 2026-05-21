import { supabase } from "../supabase/cliente"

export const getUser = async (userId) => {
    const { data, error } = await supabase
        .from('Usuario')
        .select()
        .eq('id', userId)
        .single() // mejor que data[0]
    if (error) {
        throw error
    }
    return data
}

export const actualizarDataUser = async (userId, newData) => {
    const { data, error } = await supabase
        .from('Usuario')
        .update(newData)
        .eq('id', userId)
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}