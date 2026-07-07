import React from 'react'
import { ClipLoader } from 'react-spinners'

// Agregamos la prop className para darle flexibilidad externa si la necesitas
export const Spinner = ({ className = '' }) => {
    return (
        <div className={`w-full flex items-center justify-center p-8 ${className}`}>
            <ClipLoader color={"#6F8FE0"} size={50} /> {/* Bajé un poco el size a 50 para que encaje mejor en componentes */}
        </div>
    )
}
