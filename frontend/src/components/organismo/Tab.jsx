import { PieChart, LineChart, BarChart3 } from 'lucide-react';
import React, { useState } from 'react'
import { useMotionStore } from '../../store/MotionStore';
import { useMotionQuery } from '../../hook/useMotionQuery';
import { Spinner } from '../atomo/Spinner';
import { EmptyState } from '../molecula/EmptyState';
import { Dona } from './graficas/Dona';
import { Lineal } from './graficas/Lineal';
import { Barras } from './graficas/Barras';


export const Tab = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { motionTipo } = useMotionStore()
    const { reportMotion, isLoadingMotion } = useMotionQuery(motionTipo.tipo)

    if (isLoadingMotion) return <Spinner />

    const labels = reportMotion.map(item => item.descrip)
    const data = reportMotion.map(item => item.total)

    const dataGrafica = {
        type: "line",
        labels,
        datasets: [
            {
                fill: true,
                tension: 0.3,
                spacing: 1,
                borderRadius: 3,
                label: 'Total',
                data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const seleccionar = (i) => {
        setActiveTab(i)
    };

    return (
        <div className="w-full text-foreground px-5">
            {/* Contenedor de la Tab Bar */}
            <div className='max-w-lg mx-auto'>
                <ul className="flex items-center justify-between py-1.5 px-2.5 bg-bg-primary backdrop-blur-md rounded-full shadow-md mb-1">
                    {[
                        { id: 0, Icon: PieChart, label: 'Reportes' },
                        { id: 1, Icon: LineChart, label: 'Cálculos' },
                        { id: 2, Icon: BarChart3, label: 'Agenda' }
                    ].map((tab) => (
                        <li
                            key={tab.id}
                            onClick={() => seleccionar(tab.id)}
                            className={`
                    flex flex-1 items-center justify-center gap-2 py-2.5 px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out
                    ${activeTab === tab.id
                                    ? 'bg-bg-azul2 text-blackshadow-md scale-105 shadow-[0_7px_15px_0.5px_rgba(111,143,224,0.6)]'
                                    : 'text-foreground hover:text-gray-500 '}
                `}
                        >
                            <tab.Icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                            <span className={`text-sm font-medium ${activeTab === tab.id ? 'block' : 'hidden '}`}>
                                {tab.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contenedor del Contenido */}

            {reportMotion.length === 0 ?
                <EmptyState text='No hay reportes' />
                :
                <div className=" text-foreground rounded-3xl p-6 min-h-[200px] transition-all duration-500 ">
                    {activeTab === 0 && (
                        <Dona
                            data={dataGrafica}
                            dataReporte={reportMotion}
                            tipo={motionTipo.tipo}
                        />
                    )}
                    {activeTab === 1 && (
                        <Lineal
                            data={dataGrafica}
                            dataReporte={reportMotion}
                            tipo={motionTipo.tipo}
                        />
                    )}
                    {activeTab === 2 && (
                        <Barras
                            data={dataGrafica}
                            dataReporte={reportMotion}
                            tipo={motionTipo.tipo}
                        />
                    )}
                </div>
            }

        </div>
    )
}
