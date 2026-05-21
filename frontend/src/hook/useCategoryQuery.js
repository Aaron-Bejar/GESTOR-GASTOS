import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { deleteCategoria, deleteCategoriaAll, getCategorias, insertCategoria, updateCategoria } from "../services/categoryService";


export const useCategoryQuery = (tipo) => {
    const { user: authUser } = useAuth();
    const queryClient = useQueryClient();

    // --- Query: Obtener Categorías ---
    const queryCategorias = useQuery({
        queryKey: ['categoria', authUser?.id, tipo],
        queryFn: () => getCategorias(authUser.id, tipo),
        enabled: !!authUser && !!tipo,
    });

    // --- Mutation: Insertar ---
    const insertMutation = useMutation({
        mutationFn: (newCategoria) => insertCategoria(newCategoria),
        onSuccess: () => {
            // Invalida solo las categorías de este usuario y tipo
            queryClient.invalidateQueries({ queryKey: ['categoria', authUser?.id] });
        }
    });

    // --- Mutation: Actualizar ---
    // Importante: mutationFn solo recibe UN argumento. Si necesitas pasar id y data, úsalos en un objeto.
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateCategoria(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categoria', authUser?.id] });
        }
    });

    // --- Mutation: Eliminar ---
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteCategoria(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categoria', authUser?.id] });
        }
    });

    // --- Mutation: Eliminar todas las categorias ---
    const deleteAllMutation = useMutation({
        mutationFn: (idUserAuth) => deleteCategoriaAll(idUserAuth),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categoria', authUser?.id] });
        }
    });

    return {
        // Datos y estados de la consulta
        categorias: queryCategorias.data,
        isLoading: queryCategorias.isLoading,
        isError: queryCategorias.isError,
        refetch: queryCategorias.refetch,

        // Funciones para usar en los componentes
        insertar: insertMutation.mutate,
        actualizar: updateMutation.mutate,
        eliminar: deleteMutation.mutate,
        eliminarTodo: deleteAllMutation.mutate,

        // Estados de carga de las acciones (opcional pero útil)
        isInserting: insertMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        // Estados de éxito
        insertSuccess: insertMutation.isSuccess,
        updateSuccess: updateMutation.isSuccess
    };
};
