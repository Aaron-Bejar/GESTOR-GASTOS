import React from 'react'
import { GenericSelector } from './GenericSelector';

export const MotionCategoriaSelector = ({ value, onChange, categorias = [], setValue }) => {
    const handleSelect = (item) => {
        onChange?.(item)
        setValue?.("id_categoria", item.id)
    };

    return (
        <GenericSelector
            zIndex="z-70"
            value={value}
            renderValue={(value) => {
                if (!value || Object.keys(value).length === 0) {
                    return <span className="text-gray-400 truncate">Elegir categoría...</span>;
                }

                return (
                    <span className="flex items-center gap-2">
                        {value.icono} {value.descrip}
                    </span>
                );
            }}
            searchable={false}
        >
            <div className='max-h-20 overflow-y-auto sidebar-scroll mt-2'>
                {/* 1. Agregamos ?.map para proteger la renderización */}
                {categorias?.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => handleSelect(item)}
                        className="p-2 hover:bg-bg-secondary rounded-xl cursor-pointer mt-1 text-sm"
                    >
                        {item.icono}{" "}{item.descrip}
                    </div>
                ))}

                {/* 2. Opcional: Mensaje amigable si no hay categorías cargadas */}
                {(!categorias || categorias.length === 0) && (
                    <div className="p-2 text-xs text-gray-400 text-center">
                        No hay categorías disponibles
                    </div>
                )}
            </div>
        </GenericSelector>
    )
}
