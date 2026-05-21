import React from 'react'

export const InputError = ({ errors, name }) => {
    return (
        <>
            {errors[name] &&
                <span className='block text-xs absolute -bottom-5 text-red-500'>
                    {errors[name].message}
                </span>}
        </>
    )
}
