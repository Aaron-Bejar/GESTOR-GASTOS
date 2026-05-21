import React from 'react'

export const Input = ({
    type,
    placeholder,
    isReadOnly,
    register,
    name,
    rules

}) => {
    return (
        <input
            readOnly={isReadOnly}
            type={type}
            placeholder={placeholder}
            className='border border-borde-ui rounded-md p-3 w-full focus:outline focus:outline-bg-azul2'
            {...register(name, rules)}
        />
    )
}
