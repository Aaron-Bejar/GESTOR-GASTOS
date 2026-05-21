import React, { forwardRef } from 'react'
import { Search } from 'lucide-react'

export const InputBuscadorList = forwardRef(({ onChange, placeholder }, ref) => {
    return (
        <div className='w-full'>
            <div className='flex items-center gap-3 rounded-2xl border border-borde-ui bg-bg-primary text-foreground px-3 py-3 shadow-sm transition-all duration-300'>
                <Search size={18} className='text-foreground transition-all duration-300' />

                <input
                    ref={ref} // <--- Aquí es donde ocurre la "magia" del focus
                    type='text'
                    placeholder={placeholder}
                    onChange={onChange}
                    className='w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground'
                />
            </div>
        </div>
    )
})