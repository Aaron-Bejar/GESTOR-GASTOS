import React from 'react'
import { useMotionStore } from '../../store/MotionStore'
import { GridPlantilla } from './plantillas/GridPlantilla'
import { Header } from '../organismo/Header'
import { MotionSelector } from '../organismo/MotionSelector'
import { CalendarLineal } from '../molecula/CalendarLineal'
import { Tab } from '../organismo/Tab'


export const ReportTemplate = () => {

    const { motionTipo, setMotionTipo } = useMotionStore()

    return (
        <>
            <GridPlantilla
                rowsFile="grid-rows-[65px_50px_auto_auto_1fr]"
                //styleBox='rounded-lg bg-bg-primary shadow-md'
                header={
                    <Header
                        estilos="flex w-full h-full flex-row items-start justify-end p-3"
                    />
                }

                area1={
                    <div className='px-3 flex flex-row items-center relative'>
                        <MotionSelector value={motionTipo} onAction={setMotionTipo} />
                    </div>
                }

                area2={
                    <div className='flex flex-col items-center justify-center p-2'>
                        <h1 className=' text-2xl font-bold pb-2'>Reportes</h1>
                        <CalendarLineal />
                    </div>
                }

                main={
                    <div className="p-3 ">
                        <Tab />
                    </div>
                }
            />



        </>
    )
}
