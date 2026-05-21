import React from 'react'
import { useTheme } from '../../hook/useTheme'
import { Sun, } from 'lucide-react';

export const BotonTheme = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className=''>
            <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-16 items-center
                    rounded-full transition-colors duration-300 bg-bg-btn
                    shadow-[inset_0_2px_6px_rgba(0,0,0,0.24)]`
                }
            >
                {/* circulo */}
                <span
                    className={`inline-block h-6 w-6 transform rounded-full
                            shadow-md transition-transform duration-300
                    ${theme === 'light' ? "translate-x-1 bg-white" : "translate-x-8 bg-gray-400"}
                    `}
                >{theme === 'light' ? '☀' : '🌑'} </ span>
            </button>
        </div>
    );
}
