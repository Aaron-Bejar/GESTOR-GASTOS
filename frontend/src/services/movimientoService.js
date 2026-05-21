import { supabase } from "../supabase/cliente";


export const insertMotion = async (newMotion) => {
    const { data, error } = await supabase
        .from("Movimiento")
        .insert(newMotion) // El objeto ya debe traer el id_usuario, id_cuenta
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const getMotionMonthYear = async (obj) => {
    // Agrega este console.log para ver qué estás enviando realmente
    //console.log("Enviando a RPC:", obj);

    const { data, error } = await supabase
        .rpc('movimiento_month_year', {
            p_year: parseInt(obj.year),
            p_month: parseInt(obj.month),
            p_iduser: obj.idUserAuth, // Asegúrate que sea p_iduser (todo minúsculas)
            p_tipo: obj.tipo
        })

    if (error) {
        console.error("Error detalle:", error);
        throw error;
    }
    return data;
};

export const getReportMotionMonthYear = async (obj) => {
    // Agrega este console.log para ver qué estás enviando realmente
    //console.log("Enviando a RPC:", obj);

    const { data, error } = await supabase
        .rpc('report_movimiento_month_year', {
            p_year: parseInt(obj.year),
            p_month: parseInt(obj.month),
            p_iduser: obj.idUserAuth, // Asegúrate que sea p_iduser (todo minúsculas)
            p_tipo: obj.tipo
        })

    if (error) {
        console.error("Error detalle:", error);
        throw error;
    }
    return data;
};

export const deleteMotion = async (idMotion) => {
    const { data, error } = await supabase
        .from("Movimiento")
        .delete()
        .eq("id", idMotion);

    if (error) throw error;
    return data;
};

export const updateMotion = async (idMotion, newData) => {
    const { data, error } = await supabase
        .from("Movimiento")
        .update(newData)
        .eq("id", idMotion)
        .select(); // Filtramos por el ID de la fila

    if (error) throw error;
    return data;
};

export const deleteMotionAll = async (userId) => {
    const { data: misCuentas } = await supabase
        .from("Cuenta")
        .select("id")
        .eq("usuario_id", userId);

    // Extraemos solo los IDs en un array: [1, 5, 8]
    const ids = misCuentas.map(c => c.id);

    // 2. Borrar movimientos que estén "IN" (dentro de) ese array de IDs
    const { data, error } = await supabase
        .from("Movimiento")
        .delete()
        .in("id_cuenta", ids);

    if (error) throw error;
    return data;
};