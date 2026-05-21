import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getChats, insertChat } from "../services/chatService";

export const useChatsQuery = () => {
    const { user: authUser } = useAuth();
    const queryClient = useQueryClient(); 

    // Llave única para la caché basada en el ID del usuario
    const queryKey = ['chats', authUser?.id];

    const chatsQuery = useQuery({
        queryKey: queryKey,
        queryFn: () => getChats(authUser.id),
        enabled: !!authUser?.id, // Solo se ejecuta si el usuario está logueado
        staleTime: 1000 * 60 * 5, // Considera los datos limpios por 5 minutos
    });

    const insertMutation = useMutation({
        mutationFn: (newChat) => insertChat(newChat),
        onSuccess: () => {
            // 🔥 CORRECTO: Invalida y refresca la caché de este chat específico de inmediato
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
        onError: (error) => {
            console.error("Error al enviar el mensaje:", error.message);
        }
    });

    return {
        chats: chatsQuery.data || [], // Retorna array vacío por defecto para evitar errores de .map() en el componente
        isLoadingChats: chatsQuery.isLoading,
        isErrorChats: chatsQuery.isError,
        errorChats: chatsQuery.error,

        // Exponemos la función de mutación y estados útiles de carga para la UI
        insertarMensajes: insertMutation.mutate,
        isSending: insertMutation.isPending
    };
};
