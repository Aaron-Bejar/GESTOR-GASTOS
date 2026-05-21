

export const BotonOpenSidebar = ({ estado, action, icono: Icon , style }) => {

    const styleBasic = 'p-1.5 bg-bg-primary border border-bg-secondary hover:bg-bg-secondary rounded-full shadow-md transition-colors'
    if (!Icon) return null;


    return (
        <button
            onClick={action}
            className={`${styleBasic} ${style}`}
        >
            <Icon
                size={20}
                className={`text-foreground transition-transform duration-300 ${estado ? "-rotate-180" : "rotate-0"}`}
            />
        </button>
    )
}
