import { User, Palette, LogOut } from "lucide-react"

export const configDataUser = [
    { id: 1, name: "Home", icon: <User size={20} />, tipo: "home" },
    { id: 2, name: "Configuracion", icon: <Palette size={20} />, tipo: "settings" },
    { id: 3, name: "Cerrar Sesion", icon: <LogOut size={20} />, tipo: "logout" },
];