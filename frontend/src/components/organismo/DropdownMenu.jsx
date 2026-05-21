import React, { useEffect, useRef, useState } from 'react'

import { ChevronDown, User, Palette, LogOut } from "lucide-react"
import { ComboBox } from './ComboBox';

export const DropdownMenu = ({
    value,
    data,
    children,
    onAction,
    styleAdditional,
    onClick,
    efecto,
    hoverStyle
}) => {

    const [openMenu, setOpenMenu] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!efecto) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };


    }, []);

    const handleItemClick = async (ele) => {
        if (onAction) {
            await onAction(ele)
        }
        setOpenMenu(false)
    }

    return (
        <div
            onClick={onClick}
            ref={ref}
            className={`relative flex flex-col items-start 
                        rounded-2xl shadow-md border cursor-pointer 
                        transition-all duration-200 bg-bg-primary overflow-hidden
                       
                        ${styleAdditional}
                        ${openMenu ? 'border-bg-activo ' : 'border-borde-ui'}
                        `}

        >
            {/* ********* CONTENEDOR ENCABEZADO ********** */}
            <div
                onClick={() => setOpenMenu(!openMenu)}
                className={`
                    flex flex-row gap-4 w-full h-full py-3 px-4 justify-between items-center 
                    ${hoverStyle && "transition-bg duration-100 hover:bg-bg-secondary"}
                    ${value ? value.bg + " " + value.text : 'bg-bg-primary text-foreground'}
                    `}
            >
                {/* ********* ENCABEZADO ********** */}
                {React.isValidElement(children) && typeof children.type !== 'string'
                    ? React.cloneElement(children, { openMenu })
                    : children}

                {/* ********* FECHA OPEN MENU ********** */}

                <div className='flex items-center'>
                    <button className='cursor-pointer' type="button">
                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${openMenu ? "-rotate-180" : "rotate-0"}`}
                        />
                    </button>
                </div>

            </div>

            {/* ********* MENU ********** */}
            {openMenu && data &&
                <ComboBox
                    items={data}
                    functionByType={handleItemClick}
                />

            }

        </div>
    )
}
