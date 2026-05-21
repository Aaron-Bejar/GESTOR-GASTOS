import React from 'react'

export const BotonPrimary = ({ type, style, action, children, icono }) => {
    return (
        <button
            type={type}
            className={`flex items-center justify-center gap-2  cursor-pointer rounded-full py-3 px-5 my-2 font-bold
                transition-translate duration-200 translate-y-0 hover:-translate-y-0.5 active:translate-y-0
                ${style === 'bordado' && ('border-2 border-bg-azul2 text-bg-azul2')}
                ${style === 'gris' && ('bg-gray-300 text-gray-500')}
                ${style === 'colorido' && ('bg-bg-azul2 text-white')}
                ${style === 'eliminar' && (' border-2 border-red-500 bg-bg-red text-white')}
            `}
            onClick={action}
        >
            {icono && (
                <img
                    src={icono}
                    alt="icono"
                    className={` w-5 h-5 ${style === 'gris' && ('opacity-50')} ${style === 'colorido' && ('invert hue-rotate-180')}`}
                />
            )}
            {children}
        </button>
    )
}
