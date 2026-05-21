import React from 'react'
import { useAuthStore } from '../../store/AuthStore'
import { Img } from '../../assets/Img'
import { Icons } from '../../assets/Icons'
import { BotonPrimary } from '../atomo/BotonPrimary'



export const LoginCard = () => {

    const { signInWithGoogle } = useAuthStore()

    return (
        <div className=' relative z-10 bg-bg-card rounded-xl w-screen p-3 mx-4 sm:w-1/2 
            shadow-black 
        '>
            <span className='text-left text-gray-400'>version 1.0</span>
            <div className='flex flex-col items-center gap-4 mt-2'>
                <div className='max-w-1/3 animate-flotar'>
                    <img src={Img.buho} alt="" />
                </div>

                <span className='font-bold text-title'>GestOwl</span>
                <p className='text-gray-700 text-center'>Gestiona su gastos e ingresos</p>

                <BotonPrimary
                    style={'colorido'}
                    icono={Icons.google}
                    action={signInWithGoogle}
                >
                    Iniciar con Google
                </BotonPrimary>
            </div>

        </div>
    )
}
