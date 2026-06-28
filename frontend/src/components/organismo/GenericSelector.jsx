import React, { useEffect, useRef, useState } from 'react'
import { DropdownMenu} from './DropdownMenu'
import { InputBuscadorList } from '../molecula/InputBuscadorList'

export const GenericSelector = ({
    label,
    zIndex,
    data = [],
    value,
    onChange,
    renderItem,
    renderValue,
    searchable = true,
    children // 👈 clave
}) => {

    const [open, setOpen] = useState(false)
    const [filtered, setFiltered] = useState([])
    const inputRef = useRef(null)

    const toggle = () => {
        setOpen(!open)
        setFiltered([])
    }

    const buscar = (e) => {
        const val = e.target.value.toLowerCase()
        if (!val) return setFiltered([])
        const result = data.filter(item =>
            JSON.stringify(item).toLowerCase().includes(val)
        )
        setFiltered(result)
    }

    const handleSelect = (item) => {
        onChange?.(item)
    }

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus()
        }
    }, [open])

    return (
        <div className={`relative flex flex-col w-full sm:w-60 ${zIndex}`}>
            {label && <p className='pl-1'>{label}</p>}

            <DropdownMenu onClick={toggle} hoverStyle={true}>
                {renderValue ? renderValue(value) : "Seleccionar"}
            </DropdownMenu>

            {open && (
                <div className='absolute top-full left-0 mt-2 w-full bg-bg-primary p-2 shadow-md rounded-xl border border-borde-ui'>

                    {/* 👇 si hay children, ignora todo lo demás */}
                    {children ? (
                        children
                    ) : (
                        <>
                            {searchable && (
                                <InputBuscadorList
                                    ref={inputRef}
                                    onChange={buscar}
                                    placeholder="Search"
                                />
                            )}

                            <div className='max-h-40 overflow-y-auto sidebar-scroll mt-2'>
                                {filtered.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleSelect(item)}
                                        className="p-2 hover:bg-bg-secondary rounded-xl cursor-pointer mt-1 text-sm"
                                    >
                                        {renderItem(item)}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}