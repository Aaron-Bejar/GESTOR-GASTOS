import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useCalendarStore } from "../store/CalendarStore";
import { deleteMotion, getMotionMonthYear, getReportMotionMonthYear, insertMotion, updateMotion } from "../services/movimientoService";

export const useMotionQuery = (tipo) => {
    const { user: authUser } = useAuth();
    const { month, year } = useCalendarStore()
    const queryClient = useQueryClient();

    // --- Query: Obtener Motion---
    const queryMotion = useQuery({
        queryKey: ['motion', year, month.id, authUser?.id, tipo],
        queryFn: () => getMotionMonthYear({
            year,
            month: month.id,
            idUserAuth: authUser?.id,
            tipo: tipo
        }),
        enabled: !!authUser && !!tipo,
    });

    const queryReportMotion = useQuery({
        queryKey: ['reportMotion', year, month.id, authUser?.id, tipo],
        queryFn: () => getReportMotionMonthYear({
            year,
            month: month.id,
            idUserAuth: authUser?.id,
            tipo: tipo
        }),
        enabled: !!authUser && !!tipo,
    });

    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: ['motion', year, month.id] });
        queryClient.invalidateQueries({ queryKey: ['Reportmotion', year, month.id] });
    };

    // --- Mutation: Insertar ---
    const insertMutation = useMutation({
        mutationFn: (newMotion) => insertMotion(newMotion),
        onSuccess: invalidateAll
    });

    // --- Mutation: Eliminar ---
    const deleteMutation = useMutation({
        mutationFn: (idMotion) => deleteMotion(idMotion),
        onSuccess: invalidateAll
    });

    const updateMutation = useMutation({
        mutationFn: ({ idMotion, newData }) => updateMotion(idMotion, newData),
        onSuccess: invalidateAll
    });


    // --- Cálculos y Filtrados ---
    const stats = useMemo(() => {
        const data = queryMotion.data || [];

        // 1. Filtrar por estado
        const pagadosRecibidos = data.filter(m => m.estado === '1');
        const pendientes = data.filter(m => m.estado === '0');

        // 2. Calcular Totales
        const totalPendientes = pendientes.reduce((acc, m) => acc + Number(m.valor), 0);
        const totalPagadosRecibidos = pagadosRecibidos.reduce((acc, m) => acc + Number(m.valor), 0);
        const totalGeneral = data.reduce((acc, m) => acc + Number(m.valor), 0);

        return {
            listadoPagados: pagadosRecibidos,
            listadoPendientes: pendientes,
            totalPagadosRecibidos,
            totalPendientes,
            totalGeneral
        };
    }, [queryMotion.data]);

    return {
        // Datos y estados de la consulta
        motion: queryMotion.data,
        isLoadingMotion: queryMotion.isLoading || queryReportMotion.isLoading,
        isError: queryMotion.isError,
        refetch: queryMotion.refetch,

        //reportes
        reportMotion: queryReportMotion.data,

        insertar: insertMutation.mutate,
        eliminar: deleteMutation.mutate,
        actualizar: updateMutation.mutate,

        ...stats
    };
};
