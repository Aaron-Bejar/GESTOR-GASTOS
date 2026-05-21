import React from 'react'
import { LoginCard } from '../organismo/LoginCard'
import { Img } from '../../assets/Img'


export const LoginTemplate = () => {
  return (
    <>
      <div className='min-h-screen bg-cover bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${Img.fondo})` }}>
        <div className='absolute inset-0 bg-black/10 '></div>
        <LoginCard />
      </div>
    </>
  )
}
