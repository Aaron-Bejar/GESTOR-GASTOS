import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/organismo/Sidebar';

export const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        // Quitamos cualquier restricción de ancho
        <div className='flex flex-col md:flex-row min-h-screen bg-bg-tertiary '>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Agregamos inline-block o min-w-max para que el contenido "empuje" las paredes */}
            <main className={`flex-1 transition-all duration-200 ${isOpen ? "md:ml-48" : "md:ml-26"}`}>
                <Outlet />
            </main>
        </div>
    )
}
