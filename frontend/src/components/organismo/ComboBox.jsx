import React from 'react'
import { ItemCombo } from '../molecula/ItemCombo'
import { Separator } from '../atomo/Separator'


export const ComboBox = ({ items , functionByType}) => {
    const itemsHTMl = items.map(item => (
        <ItemCombo key={item.id} item={item} functionByType={functionByType} />
    ))

    return (
        <div className=' flex w-full flex-col px-4 mb-2 text-sm'>
            <Separator estilos="h-px w-full bg-gris mb-2 rounded-2xl" />
            {itemsHTMl}
        </div>
    )
}
