import React, { useState } from 'react'

import { Clock, CheckCircle2, Wallet, Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { useMotionStore } from '../../store/MotionStore';
import { useCategoryQuery } from '../../hook/useCategoryQuery';
import { useMotionQuery } from '../../hook/useMotionQuery';
import { useCuentaQuery } from '../../hook/useCuentaQuery';
import { Spinner } from '../atomo/Spinner';
import { GridPlantilla } from './plantillas/GridPlantilla';
import { Header } from '../organismo/Header';
import { MotionSelector } from '../organismo/MotionSelector';
import { BotonIcon } from '../atomo/BotonIcon';
import { CardTotales } from '../organismo/CardTotales';
import { CalendarLineal } from '../molecula/CalendarLineal';
import { MotionTabla } from '../organismo/tablas/MotionTabla';
import { MotionRegister } from '../organismo/formulario/MotionRegister';
import { InputBuscadorList } from '../molecula/InputBuscadorList';
import { MotionCategoriaSelector } from '../organismo/MotionCategoriaSelector';
import { BotonPrimary } from '../atomo/BotonPrimary';

export const MotionTemplate = () => {
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);

    const { motionTipo, setMotionTipo, motionSelect, setMotionSelect } = useMotionStore()
    const { categorias } = useCategoryQuery(motionTipo.tipo)
    const {
        motion,
        insertar,
        eliminar,
        actualizar,
        isLoading,
        totalPagadosRecibidos,
        totalPendientes,
        totalGeneral
    } = useMotionQuery(motionTipo.tipo)

    const { cuenta, isLoadingCuenta } = useCuentaQuery()
    const [busquedad, setBusquedad] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState(null);


    const limpiarFiltros = () => {
        setBusquedad("");
        setCategoriaFiltro(null);
    };

    // 2. LÓGICA DE FILTRADO COMBINADO (Texto + Categoría)
    const dataFiltrada = motion?.filter((item) => {
        // Filtro por texto: busca coincidencia en la descripción del movimiento
        const cumpleBusqueda = item.descrip
            ?.toLowerCase()
            .includes(busquedad.toLowerCase());

        // Filtro por categoría: si no hay filtro seleccionado, pasan todos. 
        // Si hay filtro, debe coincidir el id o la descripción de la categoría.
        const cumpleCategoria = !categoriaFiltro
            ? true
            : item.id_categoria === categoriaFiltro.id || item.categoria === categoriaFiltro.descrip;

        return cumpleBusqueda && cumpleCategoria;
    }) || []; // Si motion es undefined, devolvemos un array vacío de respaldo

    return (
        <>
            <GridPlantilla
                rowsFile="grid-rows-[75px_60px_auto_auto_1fr]"
                //styleBox='rounded-lg bg-bg-primary shadow-md'
                header={
                    <Header
                        estilos="flex w-full h-full flex-row items-start justify-end p-3"
                    />
                }

                area3={
                    <div className='px-3 flex flex-row items-center relative'>
                        <MotionSelector value={motionTipo} onAction={setMotionTipo} />
                        <div className=' flex items-center justify-end absolute top-3 right-3'>
                            <BotonIcon
                                value={motionTipo}
                                icon={Plus}
                                onAction={() => {
                                    if (categorias.length === 0) {
                                        Swal.fire({
                                            title: '¡Atención!',
                                            text: 'Debes registrar al menos una categoría antes de crear un movimiento.',
                                            icon: 'warning',
                                            confirmButtonText: 'Entendido',
                                            confirmButtonColor: '#8B81C3'
                                        });
                                    } else {
                                        setModalAddOpen(true);
                                    }
                                }}
                                style="w-10 h-10 rounded-full border border-white/20 shadow-sm hover:shadow-md"
                            />
                        </div>
                    </div>

                }
                area1={
                    // CARD TOTALES
                    <div className='grid gap-3 grid-cols-1 sm:grid-cols-3 p-3'>
                        <CardTotales
                            total={totalPendientes}
                            style="flex flex-col gap-3 rounded-2xl bg-gradient-to-b from-[#8B81C3] to-[#7369ad] text-white 
                            shadow-lg border border-white/10 py-3 px-4"
                            title={motionTipo.tipo === "i" ? "Ingresos Pendientes" : "Gastos Pendientes"}
                            icono={Clock}

                        />
                        <CardTotales
                            total={totalPagadosRecibidos}
                            style="flex flex-col gap-3 rounded-2xl bg-bg-primary shadow-md border border-borde-ui py-3 px-4"
                            title={motionTipo.tipo === "i" ? "Ingresos Recibidos" : "Gastos Pagados"}
                            icono={CheckCircle2}
                        />
                        <CardTotales
                            total={totalGeneral}
                            style="flex flex-col gap-3  rounded-2xl bg-bg-primary shadow-md border border-borde-ui py-3 px-4"
                            title="Total"
                            icono={Wallet}
                        />
                    </div>
                }

                area2={
                    <div className='flex items-center justify-center p-2'>
                        <CalendarLineal />
                    </div>
                }

                main={
                    <div className="flex flex-col gap-4 p-3 w-full max-w-full overflow-hidden ">
                        <div className="flex flex-col sm:flex-row gap-3 w-full items-stretch sm:items-center">

                            {/* Input toma todo el espacio disponible en móvil y escritorio */}
                            <div className="flex-1 min-w-0">
                                <InputBuscadorList
                                    placeholder="Buscar movimiento..."
                                    value={busquedad}
                                    onChange={(e) => setBusquedad(e.target.value)}
                                />
                            </div>

                            {/* Selector de categorías y botón alineados en la misma fila */}
                            <div className="flex items-center gap-3 justify-between sm:justify-start">
                                <div className="w-full "> {/* Ancho controlado en escritorio */}
                                    <MotionCategoriaSelector
                                        value={categoriaFiltro}
                                        onChange={(item) => setCategoriaFiltro(item)}
                                        categorias={categorias}
                                    />
                                </div>

                                {/* Botón de limpiar dinámico */}
                                {/* Reemplaza tu bloque del botón por este 👇 */}
                                {(busquedad || (categoriaFiltro && Object.keys(categoriaFiltro).length > 0)) && (
                                    <div className="shrink-0">
                                        <BotonPrimary
                                            style="colorido"
                                            action={limpiarFiltros}
                                        >
                                            Limpiar
                                        </BotonPrimary>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="w-full overflow-x-auto rounded-2xl border border-borde-ui bg-bg-primary shadow-sm sidebar-scroll">
                            <MotionTabla
                                data={dataFiltrada} //cada se supone q deberia mandar la data filtrada o el motion normal
                                isLoading={isLoading || isLoadingCuenta}
                                eliminar={eliminar}
                                setModalEditOpen={setModalEditOpen}
                                setMotionSelect={setMotionSelect}
                            />
                        </div>

                    </div>
                }
            />

            {modalAddOpen &&
                <MotionRegister
                    onClose={() => setModalAddOpen(false)}
                    tipo={motionTipo.tipo}
                    accion='Registrar'
                    categorias={categorias}
                    cuenta={cuenta}
                    insertar={insertar}
                />
            }

            {modalEditOpen &&
                <MotionRegister
                    onClose={() => setModalEditOpen(false)}
                    tipo={motionTipo.tipo}
                    accion='Editar'
                    categorias={categorias}
                    cuenta={cuenta}
                    editar={actualizar}
                    dataSelect={motionSelect}
                />
            }

        </>
    )
}
