import React from 'react'
import { EmptyState } from '../../molecula/EmptyState'
import { ActionsTabla } from './ActionsTabla'
import { Spinner } from '../../atomo/Spinner';

export const GenericTabla = ({
    data = [],
    isLoading = false, // 1. Agregamos la prop de control de carga
    columns = [],
    actionsIcon,
}) => {
    // Calculamos el total de columnas para el colSpan de escritorio
    const totalColumnas = columns.length + (actionsIcon ? 1 : 0);

    return (
        <div className="w-full sidebar-scroll">
            <table className="table-auto w-full rounded-2xl overflow-hidden bg-bg-primary text-foreground shadow-md">

                {/* HEAD: Se oculta en móvil, se muestra en desktop */}
                <thead className="hidden sm:table-header-group border-b border-gray-300">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className="px-2 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                                {col.label}
                            </th>
                        ))}
                        {actionsIcon && (
                            <th className="px-2 py-3 text-center text-sm font-semibold uppercase tracking-wide">
                                Acciones
                            </th>
                        )}
                    </tr>
                </thead>

                {/* BODY: Cada 'tr' es un bloque en móvil */}
                <tbody className="block sm:table-row-group">
                    {
                        // 2. Condición de Carga Prioritaria
                        isLoading ? (
                            <tr className="block sm:table-row">
                                <td
                                    colSpan={totalColumnas}
                                    className="block sm:table-cell text-center py-10"
                                >
                                    <Spinner />
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr className="block sm:table-row">
                                <td
                                    colSpan={totalColumnas}
                                    className="block sm:table-cell text-center"
                                >
                                    <EmptyState text="Sin registros" />
                                </td>
                            </tr>
                        ) : (
                            data.map((row, i) => (
                                <tr
                                    key={i}
                                    className={`block sm:table-row border-b border-borde-ui mb-4 sm:mb-0 last:mb-0 ${i % 2 !== 0 && "bg-bg-secondary"}`}
                                >
                                    {columns.map((col, j) => (
                                        <td
                                            key={j}
                                            className="block sm:table-cell px-4 py-3 text-sm text-right sm:px-0 sm:text-center relative 
                                               before:content-[attr(data-label)] before:absolute before:left-4 before:font-bold 
                                               before:uppercase before:text-xs before:sm:hidden "
                                            data-label={col.label}
                                        >
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}

                                    {actionsIcon && (
                                        <td
                                            className="block sm:table-cell px-2 py-3 text-right  sm:px-0 sm:text-center relative
                                               before:content-['Acciones'] before:absolute before:left-4 before:font-bold 
                                               before:uppercase before:text-xs before:sm:hidden"
                                        >
                                            <div className="flex justify-end sm:justify-center">
                                                <ActionsTabla actionsIcon={actionsIcon} row={row} />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
