import { supabase } from "../supabase/cliente";


export const insertCategoria = async (newCategoria) => {
    const { data, error } = await supabase
        .from("Categoria")
        .insert(newCategoria) // El objeto ya debe traer el id_usuario
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const getCategorias = async (userId, tipo) => {
    const { data, error } = await supabase
        .from("Categoria")
        .select('*')
        .eq("id_usuario", userId)
        .eq('tipo', tipo)
        .order("id", { ascending: false });

    if (error) throw error
    return data
};

export const deleteCategoria = async (idCategoria) => {
    const { data, error } = await supabase
        .from("Categoria")
        .delete()
        .eq("id", idCategoria); // Filtramos por el ID de la fila

    if (error) throw error;
    return data;
};

export const updateCategoria = async (idCategoria, newData) => {
    const { data, error } = await supabase
        .from("Categoria")
        .update(newData)
        .eq("id", idCategoria)
        .select(); // Filtramos por el ID de la fila

    if (error) throw error;
    return data;
};

export const deleteCategoriaAll = async (userId) => {
    const { data, error } = await supabase
        .from("Categoria")
        .delete()
        .eq("id_usuario", userId); // eliminamos todas la categorias del userId

    if (error) throw error;
    return data;
};