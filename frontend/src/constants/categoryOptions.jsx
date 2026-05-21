import {
    Dot,
    Palette,
    LogOut,
    Trash,
    Pencil,
    SquarePen
} from "lucide-react"

export const categoryOptions = [
    {
        id: 1,
        name: "Categoria Ingresos",
        tipo: "i",
        icon: <Dot size={20} strokeWidth={6} color="#05df72" />,
        bg: "bg-[#e3ffd8]",
        text: "text-[#309251]",

    },

    {
        id: 2,
        name: "Categoria Gastos",
        tipo: "g",
        icon: <Dot size={20} strokeWidth={6} color="#f87171" />,
        bg: "bg-[#ffd8d8]",
        text: "text-[#923030]",
    },
];


export const columnsCategory = [
    {
        label: "Descripción",
        key: "descrip"
    },

    {
        label: "Icono",
        key: "icono"
    },

    {
        label: "Color",
        key: "color",
        render: (row) => (
            <span
                className="inline-block w-4 h-4 rounded-full align-middle"
                style={{ backgroundColor: row.color }}
            >
            </span>
        )
    },
]

