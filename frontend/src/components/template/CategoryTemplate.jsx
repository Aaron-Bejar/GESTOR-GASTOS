import React, { useState } from 'react'

import { Plus } from 'lucide-react'
import { useCategoryStore } from '../../store/CategoryStore'
import { useCategoryQuery } from '../../hook/useCategoryQuery'
import { Spinner } from '../atomo/Spinner'
import { GridPlantilla } from './plantillas/GridPlantilla'
import { Header } from '../organismo/Header'
import { CategorySelector } from '../organismo/CategorySelector'
import { BotonIcon } from '../atomo/BotonIcon'
import { CategoryTabla } from '../organismo/tablas/CategoryTabla'
import { CategoryRegister } from '../organismo/formulario/CategoryRegister'

export const CategoryTemplate = () => {
    const { category, setCategory, categorySelect, setCategorySelect } = useCategoryStore()
    const { categorias, isLoading, eliminar, insertar, actualizar } = useCategoryQuery(category.tipo)
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);

    if (isLoading) return <Spinner />
    return (
        <>
            <GridPlantilla
                rowsFile="grid-rows-[80px_70px_auto_1fr]"
                header={
                    <Header
                        estilos="flex w-full h-full flex-row items-start justify-end p-3"
                    />
                }
                area1={
                    <div className=' p-2'>
                        <CategorySelector value={category} onAction={setCategory} />
                    </div>
                }

                area2={
                    <div className='flex items-center justify-end p-2'>
                        <BotonIcon
                            value={category}
                            icon={Plus}
                            onAction={() => setModalAddOpen(true)}
                            style="w-10 h-10 rounded-full border border-white/20 shadow-sm hover:shadow-md"
                        />
                    </div>
                }

                main={
                    <div className="p-3">
                        <CategoryTabla
                            data={categorias}
                            eliminar={eliminar}
                            setModalEditOpen={setModalEditOpen}
                            setcategorySelect={setCategorySelect}
                        />
                    </div>
                }
            />
            {
                modalEditOpen &&
                <CategoryRegister
                    onClose={() => setModalEditOpen(false)}
                    tipo={category.tipo}
                    accion='Editar'
                    editar={actualizar}
                    dataSelect={categorySelect}
                />

            }

            {modalAddOpen &&
                <CategoryRegister
                    onClose={() => setModalAddOpen(false)}
                    tipo={category.tipo}
                    accion='Registrar'
                    insertar={insertar}
                />
            }

        </>
    )
}
