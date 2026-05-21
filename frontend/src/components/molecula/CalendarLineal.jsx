import React, { useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendarStore } from '../../store/CalendarStore'
import { BotonIcon } from '../../components/atomo/BotonIcon';
import { meses } from '../../constants/meses'
import { useMotionStore } from '../../store/MotionStore'
import dayjs from 'dayjs'

export const CalendarLineal = () => {
    const { month, year, setMonth, setYear } = useCalendarStore()
    const { motionTipo } = useMotionStore()
    const [monthAdelantado, setMonthAdelantado] = useState(dayjs().year(year).month(month.id));

    const adelantar = () => {
        const nuevaFecha = monthAdelantado.add(1, 'month');
        setMonthAdelantado(nuevaFecha);
        const mesObj = meses.find(m => m.id === nuevaFecha.month());
        setMonth(mesObj);
        setYear(nuevaFecha.year());
    };

    const retroceder = () => {
        const nuevaFecha = monthAdelantado.subtract(1, 'month');
        setMonthAdelantado(nuevaFecha);
        const mesObj = meses.find(m => m.id === nuevaFecha.month());
        setMonth(mesObj);
        setYear(nuevaFecha.year());
    };

    return (
        <div className='flex gap-2 flex-row items-center justify-center w-full max-w-xs mx-auto'>
            {/* Botón Izquierdo */}
            <BotonIcon
                value={motionTipo}
                style='rounded-2xl p-2 shadow-sm hover:shadow-md shrink-0' // shrink-0 evita que el botón se aplaste
                icon={ChevronLeft}
                onAction={retroceder}
            />

            {/* Contenedor del Mes y Año */}
            <div className={`${motionTipo.text} ${motionTipo.bg} py-2 rounded-full shadow-md text-lg font-medium w-40 sm:w-48  
                text-center transition-all duration-200 
            `}>
                {month.nombre} {year}
            </div>

            {/* Botón Derecho */}
            <BotonIcon
                value={motionTipo}
                style='rounded-2xl p-2 shadow-sm hover:shadow-md shrink-0'
                icon={ChevronRight}
                onAction={adelantar}
            />
        </div>
    )
}
