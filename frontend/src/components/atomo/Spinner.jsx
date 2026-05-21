import React from 'react'
import { ClipLoader } from 'react-spinners'

export const Spinner = () => {
    return (
        <div className='fixed inset-0 z-150 flex items-center justify-center'>
            <ClipLoader color={"#6F8FE0"} size={70} />
        </div>
    )
}
