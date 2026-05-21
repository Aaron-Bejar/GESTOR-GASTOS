import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/AuthStore"
import { configDataUser } from "../../constants/userMenuOptions"
import { DropdownMenu } from "./DropdownMenu"
import { CardDataUser } from "./CardDataUser"


export const Header = ({ estilos }) => {
    const { signOut } = useAuthStore()
    const navigate = useNavigate()

    const handleUserMenuAction = async (ele) => {
        if (ele.tipo === "home") {
            navigate("/home")
            return
        }

        if (ele.tipo === "settings") {
            navigate("/configuration")
            return
        }

        if (ele.tipo === "logout") {
            await signOut()
        }
    }
    
    return (
        <div className={estilos}>

            <DropdownMenu
                data={configDataUser}
                onAction={handleUserMenuAction}
                styleAdditional="z-90 w-full sm:w-auto"
                efecto={true}
                hoverStyle={true}
            >
                <CardDataUser />
            </DropdownMenu>
        </div>
    )
}
