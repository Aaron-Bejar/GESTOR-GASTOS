import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export const Lineal = ({ data, dataReporte, tipo }) => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  const options = {
    responsive: true,
    // Esto permite que se estire al contenedor
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">

      {/* Contenedor del Gráfico */}
      <div className="w-full md:w-1/2 h-64 md:h-80 flex justify-center items-center">
        <Line data={data} options={options} />
      </div>

      {/* Contenedor de la Información */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-md font-bold border-b pb-2 mb-4">{tipo === 'i' ? 'Ingresos ' : 'Gastos '} {'por categoría'}</h1>

        <div className="grid grid-cols-1 gap-3 p-1  overflow-visible md:overflow-y-scroll h-auto md:max-h-48 sidebar-scroll">
          {dataReporte.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-bg-primary/50 hover:bg-bg-primary transition-colors shadow-sm"
            >
              <div className="flex items-center gap-1 py-1">
                <span className=" bg-white/10  rounded-lg leading-none">
                  {item.icono}
                </span>
                <span className="text-xs font-medium ">
                  {item.descrip}
                </span>
              </div>
              <span className="font-bold text-bg-azul2">
                {item.total.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
