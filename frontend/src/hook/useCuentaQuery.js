import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getCuenta } from "../services/cuentaService";


export const useCuentaQuery = () => {
    const { user: authUser } = useAuth();

    const userQuery = useQuery({
        queryKey: ['cuenta', authUser?.id],
        queryFn: () => getCuenta(authUser.id),
        enabled: !!authUser
    });

    return {
        cuenta: userQuery.data,
        isLoadingCuenta: userQuery.isLoading,
        isErrorCuenta: userQuery.isError,
    };
};