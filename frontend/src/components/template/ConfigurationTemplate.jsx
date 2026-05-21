import { TriangleAlert } from 'lucide-react'

import Swal from 'sweetalert2';
import { useAuth } from '../../hook/useAuth';
import { useCategoryQuery } from '../../hook/useCategoryQuery';
import { GridPlantilla } from './plantillas/GridPlantilla';
import { Header } from '../organismo/Header';
import { SaveConfiguration } from '../organismo/SaveConfiguration';
import { CardAbvertencia } from '../organismo/CardAbvertencia';
import { Img } from '../../assets/Img';

export const ConfigurationTemplate = () => {
  const { user } = useAuth()
  const { eliminarTodo } = useCategoryQuery()

  const resetAll = () => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar todo?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí colocas tu lógica para eliminar todo (ej. llamado a la API)
        eliminarTodo(user?.id, {
          onSuccess: () => {
            Swal.fire(
              '¡Eliminado!',
              'Todos los registros se han eliminado ',
              'success'
            );
          },
          onError: () => {
            Swal.fire('Error', 'No se pudo eliminar correctamente', 'error')
          }
        })
      }
    });
  };

  return (
    <>
      <GridPlantilla
        rowsFile="grid-rows-[75px_auto_auto_1fr]"

        header={
          <Header
            estilos="flex w-full h-full flex-row items-start justify-end p-3"
          />
        }

        area1={
          <div className='flex items-center justify-center w-full h-full text-2xl'>
            <p >Ajustes</p>
          </div>
        }

        area2={
          <div className="flex w-full h-full flex-row items-start p-3 justify-center ">
            <SaveConfiguration />
          </div>
        }

        main={
          <div className='p-3'>
            {/* Alerta Responsiva */}
            <CardAbvertencia
              icono={TriangleAlert}
              title='Atención: Acción Irreversible'
              descrip='Al ejecutar esta acción, *se eliminarán permanentemente* todos tus registros de movimientos y categorías.
                        También se restablecerán los *saldos acumulados* de todas tus cuentas a cero.'
              nameBtn='Resetear'
              imagen={
                <img src={Img.buho} alt="" className='w-full h-full object-contain ' />
              }
              action={resetAll}
            />
          </div>
        }
      />
    </>
  )
}
