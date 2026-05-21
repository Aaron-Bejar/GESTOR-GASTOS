import React from 'react'
import { BotonPrimary } from '../atomo/BotonPrimary';


export const CardAbvertencia = ({
    icono: Icon,
    title,
    descrip,
    nameBtn,
    imagen,
    action,
}) => {

    if (!Icon) return null;

    return (
        <div className="relative w-full bg-red-500/10 border-l-4 border-red-500 p-4 rounded-md shadow-sm ">

            <div className="flex gap-1.5 sm:flex-row items-start">
                {/* Icono */}
                <div className="flex-shrink-0 ">
                    <Icon className="h-6 w-6 text-red-600" />
                </div>

                {/* Contenedor de Texto*/}
                <div className=" flex flex-col gap-1">
                    <h3 className="text-md font-bold text-red-600 uppercase tracking-wide break-words">
                        {title}
                    </h3>

                    <p className="text-sm text-red-600 ">
                        {descrip}
                    </p>
                </div>
            </div>

            {/* Botón */}
            <div className="flex justify-center mt-2">
                <BotonPrimary
                    style="eliminar"
                    action={action}
                >
                    {nameBtn}
                </BotonPrimary>
            </div>

            <div className={`animate-flotar2 w-[20%] md:w-30 opacity-30 absolute right-2 bottom-2`}>
                {imagen}
            </div>

        </div>
    )
}
