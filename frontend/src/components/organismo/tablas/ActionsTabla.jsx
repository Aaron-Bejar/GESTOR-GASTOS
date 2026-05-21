import React from 'react'
import { BotonIcon } from '../../atomo/BotonIcon'


export const ActionsTabla = ({ actionsIcon, row }) => {

    return (
        <div className="flex items-center justify-end gap-2 px-2">
            {actionsIcon && actionsIcon.map((item) => (
                <BotonIcon
                    key={item.id}
                    icon={item.icon}
                    onAction={() => item.action(row)}
                    variant={item.variant}
                // Opcional: para diferenciar colores
                />
            ))}
        </div>
    )
}
