import React from 'react'

import { SquarePen, Trash } from 'lucide-react'
import Swal from 'sweetalert2'
import { columnsCategory } from '../../../constants/categoryOptions'
import { GenericTabla } from './GenericTabla'

export const CategoryTabla = ({
    data,
    eliminar,
    setModalEditOpen,
    setcategorySelect
}) => {
    
    const handleEdit = (row) => {
        console.log("editando", row.id)
        setcategorySelect(row)
        setModalEditOpen(true)
    }

    const handleDelete = (row) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí colocas tu lógica para eliminar (ej. llamado a la API)
                eliminar(row.id, {
                    onSuccess: () => {
                        Swal.fire(
                            '¡Eliminado!',
                            'El registro ha sido borrado.',
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire('Error', 'No se pudo eliminar correctamente', 'error')
                    }
                })
            }
        });
    }

    const actionsIcon = [
        {
            id: 1,
            icon: SquarePen,
            action: handleEdit,
            variant: "edit",
        },
        {
            id: 2,
            icon: Trash,
            action: handleDelete,
            variant: "delete",
        },
    ]

    return (
        <GenericTabla
            data={data}
            columns={columnsCategory}
            actionsIcon={actionsIcon}
        />
    )
}
