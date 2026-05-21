import React, { useState } from 'react'

import Swal from 'sweetalert2'
import { useUserQuery } from '../../hook/useUserQuery'
import { useTheme } from '../../hook/useTheme'
import { CurrencySelector } from './CurrencySelector'
import { ThemeSelector } from './ThemeSelector'
import { BotonPrimary } from '../atomo/BotonPrimary'
import { Spinner } from '../atomo/Spinner'

export const SaveConfiguration = () => {
    const { data, isLoading, updateUser, isUpdating } = useUserQuery()
    const [paisSelect, setPaisSelect] = useState(null)
    const { theme, toggleTheme } = useTheme()

    const temaSelect = theme === "light" ? '1' : '0'

    if (isLoading) return <Spinner /> 

    const currency = paisSelect ?? {
        symbol: data?.moneda,
        countryName: data?.pais
    }

    const actualizarTemaMoneda = () => {
        const newData = {
            moneda: currency.symbol,
            pais: currency.countryName,
            tema: temaSelect
        }
        updateUser(newData, {
            onSuccess: () => {
                Swal.fire({
                    title: '¡Guardado!',
                    text: 'Tu configuración se actualizó con éxito',
                    icon: 'success',
                    confirmButtonColor: '#3085d6'
                })
            },
            onError: () => {
                Swal.fire('Error', 'No se pudo guardar la configuración', 'error')
            }
        })
    };

    return (
        <div className='flex flex-col gap-1 w-full sm:w-auto'>
            <CurrencySelector
                value={currency}
                onChange={setPaisSelect}
                userData={data}
                isLoading={isLoading}
            />

            <ThemeSelector
                value={theme}
                onChange={toggleTheme}
                userData={data}
            />

            <BotonPrimary
                style="colorido"
                action={actualizarTemaMoneda}
                disabled={isUpdating}
            >
                {isUpdating ? "Guardando..." : "Guardar"}
            </BotonPrimary>
        </div>
    )
}
