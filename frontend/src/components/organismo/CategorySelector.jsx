import React from 'react'
import { categoryOptions } from '../../constants/categoryOptions'
import { DropdownMenu } from './DropdownMenu'

export const CategorySelector = ({ value, onAction }) => {

    return (
        <div className='flex w-full h-full flex-row items-start '>
            <DropdownMenu
                value={value}
                data={categoryOptions}
                onAction={onAction}
                styleAdditional="z-80"
                efecto={true}
            >
                <div>{value.name} </div>
            </DropdownMenu>
        </div>
    )
}
