import { Home, ListFilter, TrendingUp, BarChart, LayoutDashboard, Settings, Info, LogOut, Sparkles } from "lucide-react"


export const navLinks = [
    { id: 1, name: "Home", path: "/home", icon: Home },
    { id: 2, name: "Categoría", path: "/category", icon: ListFilter },
    { id: 3, name: "Movimiento", path: "/motion", icon: TrendingUp },
    { id: 4, name: "Reporte", path: "/report", icon: BarChart },
    { id: 5, name: "Asistente", path: "/asistente", icon: Sparkles },
];

export const configLinks = [
    { id: 6, name: "Configuración", path: "/configuration", icon: Settings },
    { id: 7, name: "Acerca de", path: "/home", icon: Info },
];