import { BotonTheme } from "../atomo/BotonTheme"
import { GenericSelector } from "./GenericSelector"


export const ThemeSelector = ({ value }) => {
    return (
        <GenericSelector
            label="Tema"
            zIndex="z-70"
            value={value}
            renderValue={(value) => (
                <span>{value === 'light' ? '☀ Light' : '🌑 Dark'}</span>
            )}
            searchable={false}
        >
            {/* 👇 aquí metes lo que quieras */}
            <div className="flex justify-center p-2">
                <BotonTheme />
            </div>
        </GenericSelector>
    )
}