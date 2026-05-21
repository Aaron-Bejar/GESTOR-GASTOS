
import React, { useContext } from 'react'
import { ThemeContext } from '../context/theme/ThemeContext'


export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme debe usarsedentro de ThemeProvider')
    }
    return context
}
