import { supabase } from "../supabase/cliente"


export const getCuenta = async (userId) => {
    const { data, error } = await supabase
        .from('Cuenta')
        .select()
        .eq('usuario_id', userId)
        .single() // mejor que data[0]
    if (error) {
        throw error
    }
    return data
}
