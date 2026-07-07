import React from 'react'
import { useAuthStore } from '../../store/AuthStore'
import { Img } from '../../assets/Img'
import { Icons } from '../../assets/Icons'
import { BotonPrimary } from '../atomo/BotonPrimary'



export const LoginCard = () => {

    const { signInWithGoogle } = useAuthStore()

    return (
        <div className=' relative z-10 bg-bg-card rounded-xl w-screen px-6 py-7 mx-4 sm:w-1/2 
            shadow-black 
        '>
            <span className='text-left text-gray-400'>version 1.0</span>
            <div className='flex flex-col items-center justify-center  mt-2'>
                <div className='max-w-1/3 animate-flotar'>
                    <img src={Img.logoCajaH} alt="" className='rounded-2xl' />
                </div>

                <h1 className='font-bold mt-6 text-center text-2xl sm:text-3xl md:text-title text-foreground max-w-full break-words px-2'>
                    Finanzas Personales
                </h1>
                <p className='text-gray-700 text-center'>Gestiona su gastos e ingresos</p>
                <div className='mt-5'>
                    <BotonPrimary
                        style={'colorido'}
                        icono={Icons.google}
                        action={signInWithGoogle}
                    >
                        Iniciar con Google
                    </BotonPrimary>
                </div>
            </div>

        </div>
    )
}
