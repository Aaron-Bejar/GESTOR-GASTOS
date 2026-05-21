import React from 'react'
import { useAuth } from '../../hook/useAuth'


export const CardDataUser = ({openMenu}) => {
    const { user } = useAuth()
    if (!user) return null

    return (
        <div className='flex flex-row gap-2 items-center'>
            <div>
                <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    className={`w-6 h-6 rounded-full object-cover
                                        ${openMenu && 'w-8 h-8'}
                                        `}
                    referrerPolicy="no-referrer"
                />
            </div>

            <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                    <p className='max-w-22 truncate text-sm'>{user.user_metadata.full_name}</p>
                    <div className='flex items-center'>
                        <button
                            className='shadow-sm border border-borde-ui font-bold bg-bg-quarters
                                            text-bg-azul2 text-xs rounded-md px-2 py-0.5'
                        >
                            user
                        </button>
                    </div>
                </div>

                {openMenu &&
                    <p className='text-xs text-gris'>{user.user_metadata.email}</p>
                }
            </div>
        </div>
    )
}
