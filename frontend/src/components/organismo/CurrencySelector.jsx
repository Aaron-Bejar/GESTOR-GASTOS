import React, { useMemo } from 'react'
import iso from 'iso-country-currency'
import { GenericSelector } from './GenericSelector'


export const CurrencySelector = ({ value, onChange, isLoading }) => {
    const isoCod = useMemo(() => iso.getAllISOCodes(), [])

    return (
        <GenericSelector
            label="Moneda"
            zIndex="z-80"
            data={isoCod}
            value={value}
            onChange={onChange}
            renderItem={(item) => (
                <>
                    {item.countryName} ({item.symbol})
                </>
            )}
            renderValue={(value) => (
                <div className='flex gap-1.5'>
                    <span>{isLoading ? '...' : value?.symbol}</span>
                    <span>{isLoading ? 'Cargando...' : value?.countryName}</span>
                </div>
            )}
        />
    )
}