import React from 'react'
import { Inbox } from 'lucide-react'

export const EmptyState = ({text}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
            <div className="relative">
                {/* Pulso animado nativo de Tailwind */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />
                
                <div className="bg-bg-primary border border-borde-ui p-5 rounded-3xl shadow-sm relative">
                    <Inbox size={40} className="text-indigo-400" />
                </div>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">{text}</h3>
        </div>
    )
}
