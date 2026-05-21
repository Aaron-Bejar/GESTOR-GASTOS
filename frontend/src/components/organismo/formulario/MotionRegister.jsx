import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Switch } from '@mui/material'
import { Input } from '../../molecula/Input'
import { InputError } from '../../molecula/InputError'
import { MotionCategoriaSelector } from '../MotionCategoriaSelector'
import { BotonPrimary } from '../../atomo/BotonPrimary'

import { GoogleGenerativeAI } from '@google/generative-ai';
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const MotionRegister = ({
    onClose,
    tipo,
    accion,
    insertar,
    editar,
    dataSelect,
    cuenta,
    categorias
}) => {
    const [estado, setEstado] = useState(accion === 'Editar' ? dataSelect.estado === '1' : false);
    const [categoryMostrar, setCategoryMostrar] = useState(accion === 'Editar' ? categorias.find((c) => (c.id === dataSelect.id_categoria)) : (categorias?.[0]));
    const [cargandoIA, setCargandoIA] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            monto: 0,
            tipo,
            estado: '0',
            fecha: new Date().toISOString().split('T')[0],
            descrip: '',
            id_categoria: categorias?.[0]?.id,
            id_cuenta: cuenta?.id
        }
    })

    const controlEstado = (e) => {
        const isChecked = e.target.checked;
        setEstado(isChecked);
        setValue("estado", isChecked ? '1' : '0');
    };

    const obtenerEmbedding = async (tipoMovimiento, idCategoria, descripcion) => {
        try {
            const categoriaObj = categorias.find(c => Number(c.id) === Number(idCategoria));
            const nombreCategoria = categoriaObj ? categoriaObj.descrip : 'General';
            const textoParaVector = `${tipoMovimiento === 'i' ? 'Ingreso' : 'Gasto'} - ${nombreCategoria} - ${descripcion || 'Sin descripción'}`;

            const genAI = new GoogleGenerativeAI(GEMINI_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" }); // ← este

            const result = await model.embedContent(textoParaVector);
            console.log("¡Vector generado!", result.embedding.values);
            return result.embedding.values;

        } catch (error) {
            console.error("Error crítico con Gemini:", error);
            Swal.fire({
                icon: 'warning',
                title: 'Aviso del Asistente IA',
                text: `No se pudo generar el vector: ${error.message}`,
            });
            return null;
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        setCargandoIA(true);

        // 🚀 IA: Calculamos el vector antes de guardar en Supabase
        const vectorEmbedding = await obtenerEmbedding(data.tipo, data.id_categoria, data.descrip);

        if (accion === 'Editar') {
            const dataFinal = {
                // 1. Mantenemos el ID (obligatorio para editar)
                id: dataSelect.id,

                // 2. Mapeamos los nombres del formulario a los de la BD
                valor: Number(data.monto),       // 'monto' en form -> 'valor' en BD
                id_categoria: Number(data.id_categoria),
                id_cuenta: Number(data.id_cuenta),

                // 3. El resto de campos que se llaman igual
                tipo: data.tipo,
                estado: data.estado,
                fecha: data.fecha,
                descrip: data.descrip,
                embedding: vectorEmbedding
            };

            editar({ idMotion: dataSelect.id, newData: dataFinal }, {
                onSuccess: () => {
                    Swal.fire(
                        '¡Editado!',
                        'El registro se modifico exitosamente.',
                        'success'
                    );
                },
                onError: () => {
                    Swal.fire('Error', 'No se pudo actualizar datos', 'error')
                },
                onSettled: () => setCargandoIA(false)
            })

        } else {
            const dataFinal = {
                tipo: data.tipo,
                estado: data.estado,
                fecha: data.fecha,
                descrip: data.descrip,
                valor: Number(data.monto),
                id_categoria: Number(data.id_categoria),
                id_cuenta: Number(data.id_cuenta),
                embedding: vectorEmbedding
            };
            console.log("insertando movimiento: ", dataFinal)
            insertar(dataFinal, {
                onSuccess: () => {
                    Swal.fire('¡Guardado!', 'El registro se creó con éxito.', 'success');
                    reset();
                    onClose();
                },
                onError: (error) => {
                    Swal.fire('Error', error?.message || 'No se pudo guardar', 'error');
                },
                onSettled: () => setCargandoIA(false)
            });
        }
    })

    useEffect(() => {
        if (accion === 'Editar' && dataSelect) {
            // 2. Sincronizamos todo el formulario de una vez
            reset({
                monto: dataSelect.valor,
                tipo: dataSelect.tipo, // o el tipo que venga
                estado: dataSelect.estado,
                fecha: dataSelect.fecha,
                descrip: dataSelect.descrip,
                id_categoria: dataSelect.id_categoria,
                id_cuenta: cuenta?.id
            });
        }
    }, [accion, dataSelect, reset]);

    return (
        <div className='fixed inset-0 z-200 flex items-center justify-center text-foreground'>
            <div
                className='absolute inset-0 bg-black/50 backdrop-blur-xs'
                onClick={onClose}
            >
            </div>


            <div className='relative z-10 w-full max-w-md p-6 bg-bg-primary rounded-lg shadow-xl border border-borde-ui'>
                <p className='text-xl font-bold mb-4'>
                    {accion === 'Editar' ? 'Editar' : 'Nuevo'}
                    {tipo === "i" ? " ingreso" : " gasto"}
                </p>

                {/*formulario */}
                <form
                    className='flex flex-col gap-2'
                    action=""
                    onSubmit={onSubmit}
                >
                    <div className='flex flex-col gap-6'>

                        {/* MONTO */}
                        <div className='flex flex-col gap-2 '>
                            <label >Monto:</label>
                            <Input
                                type='number'
                                placeholder='Ingrese el monto'
                                isReadOnly={false}
                                register={register}
                                name='monto'
                                rules={{
                                    required: "Monto obligatorio",
                                    Number: "El campo es de tipo númerico"
                                }}
                            />
                            <InputError errors={errors} name='monto' />
                        </div>

                        {/* ESTADO */}
                        <div className='flex flex-row gap-2 items-center '>
                            <label >{tipo === "i" ? "Fue recibido:" : " Fue Pagado:"}</label>
                            <Switch
                                onChange={controlEstado}
                                checked={estado}
                                color='secondary'
                            />
                        </div>

                        {/* FECHA*/}
                        <div className='flex flex-row gap-2 items-center relative '>
                            <label >Fecha: </label>
                            <Input
                                type='date'
                                placeholder='fecha'
                                isReadOnly={false}
                                register={register}
                                name='fecha'
                                rules={{
                                    required: "Fecha obligatorio"
                                }}
                            />
                            <InputError errors={errors} name='fecha' />
                        </div>

                        {/* DESCRIP */}
                        <div className='flex flex-col gap-2 relative'>
                            <label >Descripción:</label>
                            <Input
                                type='text'
                                placeholder='Escribe algo...'
                                isReadOnly={false}
                                register={register}
                                name='descrip'
                                rules={{
                                    required: "Categoria obligatoria",
                                    minLength: {
                                        value: 3,
                                        message: 'La descripcion debe tener mínimo 2 caracteres'
                                    }
                                }}
                            />
                            <InputError errors={errors} name='descrip' />
                        </div>

                        {/* CATEGORIA */}
                        <div className='flex flex-row gap-2 items-center '>
                            <label >Categoría: </label>
                            <MotionCategoriaSelector
                                value={categoryMostrar}
                                onChange={setCategoryMostrar}
                                categorias={categorias}
                                setValue={setValue}
                            />
                        </div>

                    </div>

                    <div className='flex justify-end gap-1'>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 transition-text duration-100 text-foreground hover:text-gray-700 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <BotonPrimary
                            type="submit"
                            style="colorido"
                            disabled={cargandoIA}
                        >
                            {
                                cargandoIA ?
                                    'cargando...'
                                    :
                                    (accion === 'Editar' ?
                                        'Editar' :
                                        'Registrar')
                            }
                        </BotonPrimary>
                    </div>
                </form>
            </div >
        </div >
    )
}
