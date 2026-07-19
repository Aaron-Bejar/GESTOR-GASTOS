import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BotonOpenSidebar } from "../atomo/BotonOpenSidebar";
import { Img } from "../../assets/Img";
import { configLinks, navLinks } from "../../constants/sidebarLinks";
import { Enlace } from "../atomo/Enlace";
import { ChevronRight, Menu, CircleHelp, Bot, MessageSquare } from 'lucide-react'
import { BotonPrimary } from "../atomo/BotonPrimary";

export const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const [isMobil, setIsMobil] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Si es menor a 400px, forzamos el cierre
            if (window.innerWidth < 768) {
                setIsOpen(false);
                setIsMobil(true)
            }
            if (window.innerWidth >= 768) {
                setIsMobil(false)
            }
        };
        // Ejecutamos al cargar para verificar el tamaño inicial
        handleResize();
        // Escuchamos el cambio de tamaño
        window.addEventListener('resize', handleResize);
        // Limpiamos el evento al desmontar el componente
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsOpen]);

    return (
        <header className={`sticky md:fixed top-0 left-0 md:h-screen z-100 text-color-foreground transition-all duration-150 shadow-card md:bg-bg-primary
    md:${isOpen ? "w-50" : "w-22"}"}
        `}>
            <div className={`flex justify-between items-center relative z-80 backdrop-blur-md 
                transition-bg duration-150 md:justify-center 
                ${isOpen ? " bg-bg-primary" : "bg-bg-primary/30"}`}>

                <Link to={'/Home'} className={`flex py-4 px-4 items-center transition-all border-l-4 border-transparent ${isOpen && isMobil === false ? "py-8 px-7 gap-4" : "py-8 "}`}>

                    <div className={`animate-flotar2 w-10 `}>
                        <img src={Img.buho} alt="" className='rounded-lg w-full h-full object-contain' />
                    </div>
                    {isOpen && isMobil === false && (
                        <span className='text-foreground text-xl font-bold flex flex-col'>
                            <span>GestOwl</span>
                            
                        </span>
                    )}
                </Link>

                <BotonOpenSidebar
                    estado={isOpen}
                    action={() => setIsOpen(!isOpen)}
                    icono={isMobil ? Menu : ChevronRight}
                    style={`m-3 md:m-0 md:absolute -right-4 top-18`}
                />
            </div>

            {isMobil ?
                <nav className={`absolute bg-bg-primary w-full shadow-md transition-all duration-200  
                ${isOpen ? "top-28" : "-top-130"}`}>
                    <ul>
                        <div className={` flex flex-col items-center`}>
                            {navLinks.map(link => (
                                <Enlace
                                    key={link.id}
                                    ruta={link.path}
                                    name={link.name}
                                >
                                    {link.name}
                                </Enlace>
                            ))}
                        </div>

                        <div className={` flex flex-col items-center`}>
                            {configLinks.map(link => (
                                <Enlace
                                    key={link.id}
                                    ruta={link.path}
                                    name={link.name}
                                >
                                    {link.name}
                                </Enlace>
                            ))}
                        </div>
                    </ul>
                </nav>

                :
                <nav className='flex-1 h-full overflow-y-auto sidebar-scroll' >
                    <ul className={`flex flex-col  ${isOpen && "h-full"}`}>

                        <div className={` ${!isOpen && "flex flex-col items-center"}`}>
                            {navLinks.map(link => (
                                <Enlace
                                    key={link.id}
                                    ruta={link.path}
                                    icono={link.icon}
                                    estado={isOpen}
                                    name={link.name}
                                    isMobil={isMobil}
                                >
                                    {isOpen && link.name}
                                </Enlace>
                            ))}
                        </div>

                        <div className={`border-y border-bg-ui my-4 py-4 flex flex-col 
                        ${!isOpen && " items-center"}`}>
                            {configLinks.map(link => (
                                <Enlace
                                    key={link.id}
                                    ruta={link.path}
                                    icono={link.icon}
                                    estado={isOpen}
                                    name={link.name}
                                    isMobil={isMobil}
                                >
                                    {isOpen && link.name}
                                </Enlace>
                            ))}
                        </div>

                        {/* BOX ASISTENTE IA */}
                        <div className={`relative flex flex-col gap-2 p-4 mx-4 pt-8 mt-4 rounded-2xl bg-bg-quarters 
                            border border-bg-secondary transition-all duration-300 text-foreground  
                            ${!isOpen ? "items-center px-2" : "items-start"}`}>

                            {/* Icono con Glow */}
                            <div className={`absolute ${isOpen ? "left-15 -top-6" : "left-3 -top-5"}`}>
                                <Bot size={45} strokeWidth={2} />
                            </div>


                            {/* Texto - Se oculta o se centra según isOpen */}
                            {isOpen && (
                                <div className="flex flex-col gap-1 text-center w-full">
                                    <h3 className="font-bold text-sm">Asistente IA</h3>
                                </div>
                            )}

                            {/* Botón dinámico */}
                            <div className="w-full flex justify-center">
                                {isOpen ? (
                                    <BotonPrimary style="colorido" action={() => navigate("/asistente")}>
                                        <MessageSquare size={14} /> Chatear
                                    </BotonPrimary>
                                ) : (
                                    <div className="mt-3">
                                        <BotonPrimary style="colorido" action={() => navigate("/asistente")}>
                                            <MessageSquare size={15} />
                                        </BotonPrimary>
                                    </div>
                                )}
                            </div>

                        </div>
                    </ul>
                </nav>}
        </header>
    )
}