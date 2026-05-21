import React from 'react'
import { DropdownMenu } from './DropdownMenu'
import { motionOptions } from '../../constants/MotionOptions'


export const MotionSelector = ({ value, onAction }) => {

    return (
        <div className='flex w-full h-full flex-row items-start '>
            <DropdownMenu
                value={value}
                data={motionOptions}
                onAction={onAction}
                styleAdditional="z-80"
                efecto={true}
            >
                <div>{value.name} </div>
            </DropdownMenu>
        </div>
    )
}
