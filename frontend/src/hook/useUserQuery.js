import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { actualizarDataUser, getUser } from "../services/userService";


export const useUserQuery = () => {
    const { user: authUser } = useAuth();
    const queryClient = useQueryClient();

    const userQuery = useQuery({
        queryKey: ['user', authUser?.id],
        queryFn: () => getUser(authUser.id),
        enabled: !!authUser
    });

    const updateMutation = useMutation({
        mutationFn: (newData) => actualizarDataUser(authUser.id, newData),

        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user', authUser?.id], (oldData) => {
                // Si no hay datos previos, no hacemos nada
                if (!oldData) return updatedUser;
                // Retornamos una copia de los datos viejos + los nuevos
                return {
                    ...oldData,
                    ...updatedUser
                };
            });
        }
    });

    return {
        data: userQuery.data,
        isLoading: userQuery.isLoading,
        isError: userQuery.isError,

        updateUser: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        isSuccess: updateMutation.isSuccess
    };
};