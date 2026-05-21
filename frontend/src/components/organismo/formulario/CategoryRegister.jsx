
import { useForm } from 'react-hook-form';
import EmojiPicker from 'emoji-picker-react'
import { CirclePicker } from 'react-color'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../../hook/useAuth';
import { Input } from '../../molecula/Input';
import { InputError } from '../../molecula/InputError';
import { BotonPrimary } from '../../atomo/BotonPrimary';

export const CategoryRegister = ({ onClose, tipo, accion, insertar, editar, dataSelect }) => {
    const [icono, setIcono] = useState('📝');
    const [color, setColor] = useState("#000000");
    const [isOpen, setisOpen] = useState(false);
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm({
        defaultValues: {
            descrip: '',
            color: '',
            icono: '📝'
        }
    })

    const handleColor = (color) => {
        const nuevoColor = color.hex;
        setColor(nuevoColor);
        setValue("color", nuevoColor, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const onEmojiClick = (emojiData) => {
        setIcono(emojiData.emoji);
        setValue("icono", emojiData.emoji); // Actualiza react-hook-form
        setisOpen(false); // Opcional: cierra el picker al elegir
    };

    const onSubmit = handleSubmit((data) => {
        console.log('ESTO ES MI DATA')
        if (accion === 'Editar') {
            const dataFinal = {
                ...dataSelect,
                ...data
            };

            editar({ id: dataSelect.id, data: dataFinal }, {
                onSuccess: () => {
                    Swal.fire(
                        '¡Editado!',
                        'El registro se modifico exitosamente.',
                        'success'
                    );
                },
                onError: () => {
                    Swal.fire('Error', 'No se pudo actualizar datos', 'error')
                }
            })

        } else {
            const dataFinal = {
                ...data,
                tipo: tipo,
                id_usuario: user.id
            };
            insertar(dataFinal, {
                onSuccess: () => {
                    Swal.fire('¡Guardado!', 'El registro se creó con éxito.', 'success');
                    reset();
                },
                onError: (error) => {
                    if (error?.code === '23505' || error?.message?.includes('already exists')) {
                        Swal.fire(
                            'Atención',
                            'Ya existe una categoría con esa misma descripción.',
                            'warning'
                        );
                    } else {
                        // 2. Error genérico para otros casos
                        Swal.fire('Error', error?.message || 'No se pudo guardar', 'error');
                    }
                }
            });
        }
    })

    useEffect(() => {
        if (accion === 'Editar' && dataSelect) {
            // 1. Actualizamos los estados que controlan la vista (Picker de color e icono)
            setIcono(dataSelect.icono || '📝');
            setColor(dataSelect.color || '#000000');

            // 2. Llenamos todo el formulario de un solo golpe
            reset({
                descrip: dataSelect.descrip,
                color: dataSelect.color,
                icono: dataSelect.icono
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
                    {
                        accion === 'Editar' ? 'Editar categoría' :
                            'Registrar nueva categoría'
                    }
                    {tipo === "i" ? " (ingresos)" : " (gastos)"}
                </p>

                {/*formulario */}
                <form
                    className='flex flex-col gap-2'
                    action=""
                    onSubmit={onSubmit}
                >
                    <div className='flex flex-col gap-6'>

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

                        {/* COLOR */}
                        <div className='flex flex-col gap-2 relative'>
                            <label className='block'>Color:</label>
                            <Input
                                type='text'
                                placeholder='Seleccione un color'
                                isReadOnly={true}
                                register={register}
                                name='color'
                                rules={{
                                    required: "Color obligatoria",
                                }}
                            />
                            <CirclePicker color={color} onChange={handleColor} />
                            <InputError errors={errors} name='color' />
                        </div>

                        {/* EMOJI */}
                        <div className='relative '>
                            <label className='block mb-2'>Emojis:</label>
                            <div className='flex flex-row gap-3'>
                                <button
                                    type="button"
                                    onClick={() => setisOpen(!isOpen)}
                                    className='text-4xl cursor-pointer border-none  transition-transform duration-200 hover:scale-105'
                                >
                                    {watch('icono')}
                                </button>

                                <Input
                                    type='text'
                                    placeholder='Seleccione un emoji'
                                    isReadOnly={true}
                                    register={register}
                                    name='icono'
                                />
                            </div>

                            {isOpen && (
                                <div className='absolute z-50 -top-55 left-15'>
                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
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
                        >
                            {accion === 'Editar' ?
                                'Editar' :
                                'Registrar'
                            }
                        </BotonPrimary>
                    </div>
                </form>
            </div >
        </div >
    );
}
