import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BotonPrimary } from '../atomo/BotonPrimary'
import { Carousel } from '../molecula/carousel/Carousel'

export const HomeTemplate = () => {
  const navigate = useNavigate()

  return (
    <div className='text-foreground flex flex-col justify-center gap-5 p-5 mt-5 text-center items-center overflow-hidden 
    md:min-h-screen md:mt-0 md:px-20
    lg:flex-row lg:gap-10 
    '
    >

      <section className="w-full flex flex-col gap-2 justify-center ">
        <span className=" bg-blue-100 text-bg-azul2 rounded-full font-bold shadow-md m-auto px-3 md:px-10 py-1 lg:mx-0 lg:w-fit lg:px-7" >
          Novedad: Reportes en Tiempo Real
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold transition-text duration-100 lg:text-start" >
          Visualiza tus datos con <span className="text-bg-azul2">Claridad</span>
        </h1>
        {/* descripcion */}
        <p className="font-bold text-balance lg:text-start">
Toma el control total de tus finanzas personales registrando tus ingresos y gastos diarios de forma dinámica. Analiza tu salud financiera con gráficos interactivos y obtén recomendaciones personalizadas conversando con nuestro Asistente Inteligente potenciado por IA.        </p>

        <div className="flex justify-center lg:justify-start">
          <BotonPrimary
            style={'colorido'}
            action={() => navigate("/configuration")}
          >
            Continuar
          </BotonPrimary>
        </div>

      </section>

      <section className="">
        <Carousel />
      </section>

    </div>

  )
}
