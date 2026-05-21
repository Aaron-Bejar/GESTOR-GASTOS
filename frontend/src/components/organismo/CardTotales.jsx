import React from 'react'

import { ChevronDown } from 'lucide-react'
import { useUserQuery } from '../../hook/useUserQuery'
import { BotonIcon } from '../atomo/BotonIcon'

export const CardTotales = ({ total, title, icono, style, styleFlecha, styleBtn }) => {
    const { data: dataUser } = useUserQuery()
    return (
        <div className={style}>

            <section className='flex flex-col gap-3'>
                <div className='flex flex-row gap-2 items-center justify-between'>
                    <p className=' truncate'>{title}</p>
                    <BotonIcon
                        icon={ChevronDown}
                        onAction={() => console.log("")}
                        style={styleFlecha}
                    />
                </div>
                <p className='text-3xl truncate'>{dataUser.moneda}{" "}{total}</p>
            </section>

            <section className='flex justify-end'>
                <BotonIcon
                    icon={icono}
                    onAction={() => console.log("")}
                    style={styleBtn}
                />
            </section>
        </div>
    )
}
