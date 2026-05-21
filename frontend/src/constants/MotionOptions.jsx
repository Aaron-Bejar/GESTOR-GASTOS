import { Dot } from "lucide-react";

export const columnsMotion = [
    {
        label: "estado",
        key: "estado",
        render: (row) => (
            <span
                className={`${row.estado === '0' ? 'text-red-500' : 'text-green-400'}`}
            >
                {row.estado === '0' ? 'Pendiente' : `${row.tipo === 'i' ? 'Recibido' : 'Pagado'}`}
            </span>
        )
    },

    {
        label: "Fecha",
        key: "fecha"
    },
    {
        label: "Descrip",
        key: "descrip"
    },
    {
        label: "Categoría",
        key: "categoria"
    },
    {
        label: "Cuenta",
        key: "cuenta"
    },
    {
        label: "Valor",
        key: "valormoneda"
    },

]

export const motionOptions = [
    {
        id: 1,
        name: "Ingresos",
        tipo: "i",
        icon: <Dot size={20} strokeWidth={6} color="#05df72" />,
        bg: "bg-[#e3ffd8]",
        text: "text-[#309251]",
    },

    {
        id: 2,
        name: "Gastos",
        tipo: "g",
        icon: <Dot size={20} strokeWidth={6} color="#f87171" />,
        bg: "bg-[#ffd8d8]",
        text: "text-[#923030]",
    },
];
